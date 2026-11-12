# Paso 1: averigua el "chat id" del dueño, que es a quien llegaran los avisos.
#
# Antes: el dueño ha creado el bot con @BotFather (te da un token) y le ha escrito un mensaje al bot
# (por ejemplo /start) desde su Telegram.
#
# Uso (en PowerShell; el token se queda solo en esta ventana, no se guarda en ningun archivo):
#   $env:TELEGRAM_BOT_TOKEN = "el-token-del-bot"
#   .\scripts\telegram\1-obtener-chat-id.ps1

$ErrorActionPreference = "Stop"
$token = $env:TELEGRAM_BOT_TOKEN
if (-not $token) { Write-Host "Falta la variable TELEGRAM_BOT_TOKEN (ver las instrucciones de arriba)." -ForegroundColor Red; exit 1 }

try { $me = Invoke-RestMethod "https://api.telegram.org/bot$token/getMe" -TimeoutSec 20 }
catch { Write-Host "Telegram no acepta ese token. Revisa que lo has copiado entero." -ForegroundColor Red; exit 1 }
Write-Host ("Bot encontrado: @" + $me.result.username)

$upd = Invoke-RestMethod "https://api.telegram.org/bot$token/getUpdates" -TimeoutSec 20
$chats = @{}
foreach ($u in $upd.result) {
  $m = $u.message; if (-not $m) { $m = $u.channel_post }; if (-not $m) { continue }
  $c = $m.chat
  $nombre = (($c.first_name, $c.last_name, $c.title, $c.username) | Where-Object { $_ }) -join " "
  $chats[[string]$c.id] = $nombre
}
if ($chats.Count -eq 0) {
  Write-Host "No hay ningun chat todavia. Pide al dueño que abra el bot en Telegram, pulse Iniciar (o envie /start) y vuelve a ejecutar este script." -ForegroundColor Yellow
  exit 1
}
Write-Host "Chats que han escrito al bot:"
$chats.GetEnumerator() | ForEach-Object { Write-Host ("  chat id {0}  ({1})" -f $_.Key, $_.Value) }
Write-Host "Usa el chat id del dueño en el paso 2 (variable TELEGRAM_CHAT_ID)."
