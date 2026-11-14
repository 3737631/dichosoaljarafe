# Paso 1: averigua el "chat id" al que llegaran los avisos: un GRUPO de Telegram (recomendado) o un chat privado.
#
# Antes:
#   - Se ha creado el bot con @BotFather (te da un token).
#   - Se ha creado el grupo (p. ej. "Reservas Dichoso") y se ha AÑADIDO el bot al grupo, junto con el dueño
#     y quien deba recibir los avisos. Importante: crear el grupo y añadir al bot ANTES de ejecutar esto.
#   - Si prefieres un chat privado: la persona abre el bot y pulsa Iniciar.
#
# Uso (en PowerShell; el token se queda solo en esta ventana, no se guarda en ningun archivo):
#   $env:TELEGRAM_BOT_TOKEN = "el-token-del-bot"
#   .\scripts\telegram\1-obtener-chat-id.ps1

$ErrorActionPreference = "Stop"
$token = $env:TELEGRAM_BOT_TOKEN
if (-not $token) { Write-Host "Falta la variable TELEGRAM_BOT_TOKEN (ver las instrucciones de arriba)." -ForegroundColor Red; exit 1 }

$token = $token.Trim().Trim('"').Trim("'")   # quita espacios y comillas sobrantes
if ($token -notmatch '^\d{6,12}:[A-Za-z0-9_-]{30,}$') {
  Write-Host "El token no tiene el formato esperado: numero, dos puntos y letras, todo junto y sin espacios (ej. 1234567890:AAF...)." -ForegroundColor Red
  Write-Host ("Longitud recibida: " + $token.Length + " (un token real tiene unos 45). Vuelve a copiarlo entero desde BotFather.") -ForegroundColor Red
  exit 1
}
try { $me = Invoke-RestMethod "https://api.telegram.org/bot$token/getMe" -TimeoutSec 20 }
catch {
  $code = 0; try { $code = [int]$_.Exception.Response.StatusCode } catch {}
  if ($code -eq 401 -or $code -eq 404) {
    Write-Host "Telegram dice que ese token no es valido. Suele ser porque esta incompleto, porque se ha regenerado con /revoke o porque es de otro bot." -ForegroundColor Red
    Write-Host "Saca uno vigente: en BotFather escribe /mybots, elige el bot y pulsa API Token." -ForegroundColor Red
  } else {
    Write-Host "No se ha podido hablar con Telegram (codigo $code). Es un fallo de conexion, no del token: $($_.Exception.Message)" -ForegroundColor Red
  }
  exit 1
}
Write-Host ("Bot encontrado: @" + $me.result.username)

$upd = Invoke-RestMethod "https://api.telegram.org/bot$token/getUpdates" -TimeoutSec 20
$chats = @{}
foreach ($u in $upd.result) {
  # Un grupo aparece como mensaje, o como "my_chat_member" cuando se añade al bot al grupo.
  $c = $null
  foreach ($k in "message", "edited_message", "channel_post", "my_chat_member") {
    if ($u.$k -and $u.$k.chat) { $c = $u.$k.chat; break }
  }
  if (-not $c) { continue }
  $nombre = (($c.title, $c.first_name, $c.last_name, $c.username) | Where-Object { $_ }) -join " "
  $chats[[string]$c.id] = ("{0} [{1}]" -f $nombre, $c.type)
}
if ($chats.Count -eq 0) {
  Write-Host "No hay ningun chat todavia." -ForegroundColor Yellow
  Write-Host "  - Grupo: comprueba que el bot esta en el grupo. Si ya estaba, escribe en el grupo /start@$($me.result.username) y vuelve a ejecutar."
  Write-Host "  - Chat privado: abre el bot, pulsa Iniciar y vuelve a ejecutar."
  exit 1
}
Write-Host "Chats que ha visto el bot:"
$chats.GetEnumerator() | ForEach-Object { Write-Host ("  chat id {0}   {1}" -f $_.Key, $_.Value) }
Write-Host "Los grupos tienen chat id NEGATIVO (p. ej. -1001234567890). Usa ese numero, con el signo, en el paso 2 (TELEGRAM_CHAT_ID)."
Write-Host "Aviso: si despues conviertes el grupo en supergrupo o activas temas, el chat id cambia y hay que repetir el paso 2."
