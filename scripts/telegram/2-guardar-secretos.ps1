# Paso 2: guarda el token del bot y el chat del dueño en el almacen de secretos (vault) de Supabase.
# Los secretos nunca se escriben en el repositorio ni se muestran en pantalla.
#
# Requiere haber hecho antes "supabase login" y estar el proyecto lfnenhsijsvysmluvllx disponible.
#
# Uso:
#   $env:TELEGRAM_BOT_TOKEN = "el-token-del-bot"
#   $env:TELEGRAM_CHAT_ID   = "el-chat-id-del-grupo-o-chat"
#   .\scripts\telegram\2-guardar-secretos.ps1
#
# Se puede repetir: si los secretos ya existen, los actualiza.
# Si ya se mando el mensaje de bienvenida y solo quieres reintentar el guardado:  -SinMensaje

param([switch]$SinMensaje)

$ErrorActionPreference = "Stop"
$token = $env:TELEGRAM_BOT_TOKEN; $chat = $env:TELEGRAM_CHAT_ID
if (-not $token -or -not $chat) { Write-Host "Faltan TELEGRAM_BOT_TOKEN y/o TELEGRAM_CHAT_ID." -ForegroundColor Red; exit 1 }
$token = $token.Trim().Trim('"').Trim("'"); $chat = $chat.Trim().Trim('"').Trim("'")
if ($token -notmatch '^\d{6,12}:[A-Za-z0-9_-]{30,}$') {
  Write-Host "El token no tiene el formato esperado (numero:letras, sin espacios). Longitud recibida: $($token.Length)." -ForegroundColor Red; exit 1
}
if ($chat -notmatch '^-?\d+$') { Write-Host "El chat id debe ser un numero, con el signo - si es un grupo (ej. -1001234567890)." -ForegroundColor Red; exit 1 }

# 1) Comprobar el token y que el bot puede escribir al chat, antes de guardar nada
try { Invoke-RestMethod "https://api.telegram.org/bot$token/getMe" -TimeoutSec 20 | Out-Null }
catch {
  $code = 0; try { $code = [int]$_.Exception.Response.StatusCode } catch {}
  if ($code -eq 401 -or $code -eq 404) { Write-Host "Telegram dice que ese token no es valido (incompleto, regenerado o de otro bot)." -ForegroundColor Red }
  else { Write-Host "No se ha podido hablar con Telegram (codigo $code): fallo de conexion, no del token." -ForegroundColor Red }
  exit 1
}
if (-not $SinMensaje) {
  try {
    Invoke-RestMethod "https://api.telegram.org/bot$token/sendMessage" -Method Post -ContentType "application/json" -TimeoutSec 20 `
      -Body (@{ chat_id = $chat; text = "Dichoso: avisos de reservas conectados. A partir de ahora recibiras aqui cada reserva nueva de la web." } | ConvertTo-Json) | Out-Null
  } catch { Write-Host "El bot no puede escribir a ese chat. Comprueba el chat id y que el bot esta dentro del grupo (o que el dueño ha pulsado Iniciar)." -ForegroundColor Red; exit 1 }
}

# 2) Ejecuta la CLI de Supabase sin que PowerShell trate su texto informativo ("Initialising login role...") como un error.
#    Devuelve el codigo de salida y la salida con el token y el chat tapados.
function Invoke-Supabase {
  param([string[]]$Argumentos)
  $prev = $ErrorActionPreference; $ErrorActionPreference = "Continue"
  try {
    $salida = (& supabase @Argumentos 2>&1 | ForEach-Object { $_.ToString() }) -join "`n"
    $codigo = $LASTEXITCODE
  } finally { $ErrorActionPreference = $prev }
  $salida = $salida.Replace($token, "***TOKEN***").Replace($chat, "***CHAT***")
  return [pscustomobject]@{ Codigo = $codigo; Texto = $salida }
}

# 3) Carpeta de trabajo enlazada al proyecto (necesario para conectar por IPv4)
$work = Join-Path $env:TEMP "sbwork-aviso"
New-Item -ItemType Directory -Force (Join-Path $work "supabase\.temp") | Out-Null
$link = Invoke-Supabase @("link", "--project-ref", "lfnenhsijsvysmluvllx", "--workdir", $work, "--yes")
if ($link.Codigo -ne 0) { Write-Host "No se pudo enlazar con el proyecto de Supabase. ¿Has hecho 'supabase login'?" -ForegroundColor Red; Write-Host $link.Texto; exit 1 }

# 4) Guardar en vault (crear o actualizar)
$sql = @"
do `$`$
declare v_id uuid;
begin
  select id into v_id from vault.secrets where name = 'telegram_bot_token';
  if v_id is null then perform vault.create_secret('$token', 'telegram_bot_token'); else perform vault.update_secret(v_id, '$token'); end if;
  select id into v_id from vault.secrets where name = 'telegram_chat_id';
  if v_id is null then perform vault.create_secret('$chat', 'telegram_chat_id'); else perform vault.update_secret(v_id, '$chat'); end if;
end `$`$;
"@
$file = Join-Path $work "guardar.sql"
try {
  Set-Content $file $sql -Encoding UTF8
  $res = Invoke-Supabase @("db", "query", "--linked", "--workdir", $work, "-f", $file)
} finally { Remove-Item $file -Force -ErrorAction SilentlyContinue }
if ($res.Codigo -ne 0) { Write-Host "No se pudieron guardar los secretos (codigo $($res.Codigo))." -ForegroundColor Red; Write-Host $res.Texto; exit 1 }

# 5) Comprobar que estan guardados (solo cuenta los nombres, no lee los valores)
$check = Invoke-Supabase @("db", "query", "--linked", "--workdir", $work, "-o", "json",
  "select count(*) as n from vault.secrets where name in ('telegram_bot_token','telegram_chat_id')")
$n = $null
try {
  # La CLI devuelve {"rows":[{"n":2}]} o, segun la version/terminal, directamente [{"n":2}]
  $ini = $check.Texto.IndexOfAny([char[]]@('{', '['))
  $json = $check.Texto.Substring($ini) | ConvertFrom-Json
  $fila = if ($json.PSObject.Properties.Name -contains 'rows') { @($json.rows)[0] } else { @($json)[0] }
  $n = [int]$fila.n
} catch {}
if ($n -ne 2) { Write-Host "No he podido confirmar que los dos secretos esten guardados (veo: $n)." -ForegroundColor Red; Write-Host $check.Texto; exit 1 }

Write-Host "Secretos guardados y comprobados en Supabase (2 de 2)." -ForegroundColor Green
if (-not $SinMensaje) { Write-Host "El grupo deberia haber recibido el mensaje de bienvenida." }
