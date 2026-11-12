# Paso 4: prueba de extremo a extremo. Crea UNA reserva de prueba (fecha 2030-12-31, nombre "PRUEBA AVISO"),
# espera a que llegue el aviso a Telegram y la borra. Solo funciona despues de aplicar el SQL de avisos.
#
# Uso:
#   .\scripts\telegram\3-probar-aviso.ps1

$ErrorActionPreference = "Stop"
$src = Get-Content (Join-Path $PSScriptRoot "..\..\src\supabase.ts") -Raw
$url = [regex]::Match($src, 'SUPABASE_URL = "([^"]+)"').Groups[1].Value
$key = [regex]::Match($src, 'SUPABASE_ANON_KEY = "([^"]+)"').Groups[1].Value
if (-not $url -or -not $key) { Write-Host "No encuentro la configuracion de Supabase en src/supabase.ts" -ForegroundColor Red; exit 1 }
$H = @{ apikey = $key; Authorization = "Bearer $key"; "Content-Type" = "application/json"; Prefer = "return=minimal" }
$base = "$url/rest/v1/slots"
$fecha = "2030-12-31"

$fila = @{ date = $fecha; time = "21:00"; name = "PRUEBA AVISO"; phone = "600000000"; persons = "2"; note = "borrar, es una prueba"; zone = "terraza" } | ConvertTo-Json
try {
  Invoke-WebRequest $base -Method Post -Headers $H -Body $fila -UseBasicParsing -TimeoutSec 20 | Out-Null
  Write-Host "Reserva de prueba creada. Mira Telegram: debe llegar el aviso en unos segundos."
  Start-Sleep -Seconds 8
} finally {
  Invoke-WebRequest "$base`?date=eq.$fecha&name=eq.PRUEBA%20AVISO" -Method Delete -Headers $H -UseBasicParsing -TimeoutSec 20 | Out-Null
  Write-Host "Reserva de prueba borrada." -ForegroundColor Green
}
