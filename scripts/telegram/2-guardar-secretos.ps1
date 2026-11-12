# Paso 2: guarda el token del bot y el chat del dueño en el almacen de secretos (vault) de Supabase.
# Los secretos nunca se escriben en el repositorio ni se muestran en pantalla.
#
# Requiere haber hecho antes "supabase login" y estar el proyecto lfnenhsijsvysmluvllx disponible.
#
# Uso:
#   $env:TELEGRAM_BOT_TOKEN = "el-token-del-bot"
#   $env:TELEGRAM_CHAT_ID   = "el-chat-id-del-dueño"
#   .\scripts\telegram\2-guardar-secretos.ps1
#
# Se puede repetir: si los secretos ya existen, los actualiza.

$ErrorActionPreference = "Stop"
$token = $env:TELEGRAM_BOT_TOKEN; $chat = $env:TELEGRAM_CHAT_ID
if (-not $token -or -not $chat) { Write-Host "Faltan TELEGRAM_BOT_TOKEN y/o TELEGRAM_CHAT_ID." -ForegroundColor Red; exit 1 }
if ($token -match "'" -or $chat -match "'") { Write-Host "Los valores no pueden llevar comillas simples." -ForegroundColor Red; exit 1 }

# 1) Comprobar el token y que el bot puede escribir al chat, antes de guardar nada
try { Invoke-RestMethod "https://api.telegram.org/bot$token/getMe" -TimeoutSec 20 | Out-Null }
catch { Write-Host "Telegram no acepta ese token." -ForegroundColor Red; exit 1 }
try {
  Invoke-RestMethod "https://api.telegram.org/bot$token/sendMessage" -Method Post -ContentType "application/json" -TimeoutSec 20 `
    -Body (@{ chat_id = $chat; text = "Dichoso: avisos de reservas conectados. A partir de ahora recibiras aqui cada reserva nueva de la web." } | ConvertTo-Json) | Out-Null
} catch { Write-Host "El bot no puede escribir a ese chat. Comprueba el chat id y que el dueño ha pulsado Iniciar en el bot." -ForegroundColor Red; exit 1 }

# 2) Guardar en vault (crear o actualizar)
$work = Join-Path $env:TEMP "sbwork-aviso"
New-Item -ItemType Directory -Force (Join-Path $work "supabase\.temp") | Out-Null
Set-Content (Join-Path $work "supabase\.temp\project-ref") "lfnenhsijsvysmluvllx" -NoNewline
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
  supabase db query --linked --workdir $work -f $file 2>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "supabase db query ha fallado (codigo $LASTEXITCODE)" }
} finally { Remove-Item $file -Force -ErrorAction SilentlyContinue }
Write-Host "Secretos guardados en Supabase. El dueño deberia haber recibido un mensaje de prueba en Telegram." -ForegroundColor Green
