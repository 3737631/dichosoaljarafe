# Aviso automático por Telegram (reservas nuevas)

**Estado: preparado y probado, NO desplegado.** Nada de esto afecta a la web ni al panel actuales hasta que se siga la lista de abajo.

## Qué hace
Cada vez que un cliente reserva en la web, al móvil del dueño le llega un mensaje de Telegram con la notificación de siempre:

```
🆕 Nueva reserva
📅 sábado 12/12/2026 · 21:00
📍 Salón
👥 4 personas
👤 Nombre del cliente
📞 600123456
📝 Alergias, celebraciones…
```

No depende de que el cliente envíe el WhatsApp. No avisa de las reservas que el propio restaurante apunta en el panel, ni de cierres de horas o del salón.

## Cómo está hecho
- Un disparador en la base de datos (`sql/2026-11-12_aviso_telegram.sql`) envía el mensaje con `pg_net` (asíncrono).
- El token del bot y el chat del dueño se guardan en el almacén de secretos de Supabase (`vault`), **no en el código**.
- **No puede romper una reserva**: si Telegram falla o los secretos no están, la reserva se guarda igual y solo no hay aviso.
- El panel marca sus reservas con `origen = 'panel'` para no avisar de ellas (cambio de 5 líneas en `reservas/src/App.tsx`, rama `feature/aviso-telegram`). Si la columna aún no existe, el panel guarda igual.
- Coste: ninguno por mensaje ni cuota mensual. Los bots de Telegram son gratuitos y `pg_net` y `vault` están disponibles en todos los planes de Supabase, incluido el gratuito.

## Qué tiene que hacer el dueño (5 minutos)
1. En Telegram, buscar **@BotFather**, enviarle `/newbot`, elegir un nombre (p. ej. "Dichoso Reservas") y un usuario que termine en `bot`. Al final **BotFather da un token** (texto largo con `:`). No compartirlo por chat: dárselo a quien lo configure en persona o por un canal seguro.
2. Buscar el bot nuevo en Telegram, abrirlo y pulsar **Iniciar** (o escribir `/start`).

## Orden de despliegue (lo hace el desarrollador)
Pasos en PowerShell desde la carpeta `dichoso`:

1. **Chat del dueño**
   ```
   $env:TELEGRAM_BOT_TOKEN = "token-del-bot"
   .\scripts\telegram\1-obtener-chat-id.ps1
   ```
2. **Guardar secretos** (comprueba el token, manda un mensaje de bienvenida al dueño y guarda en `vault`)
   ```
   $env:TELEGRAM_CHAT_ID = "chat-id-del-dueño"
   .\scripts\telegram\2-guardar-secretos.ps1
   ```
3. **Aplicar el SQL** `sql/2026-11-12_aviso_telegram.sql` (Supabase → SQL Editor → pegar → Run, o con la CLI). Es aditivo: no toca ninguna reserva.
4. **Probar de extremo a extremo** (crea una reserva de prueba del 31/12/2030, comprueba que llega el aviso y la borra)
   ```
   .\scripts\telegram\3-probar-aviso.ps1
   ```
5. **Publicar el panel** (rama `feature/aviso-telegram` del repo `reservas`): fusionar en `main` y subir. La web no necesita cambios.

El orden 1 → 5 importa solo en que el SQL (3) debe ir antes de la prueba (4). Con el SQL puesto, la web actual ya avisa sin cambiar nada.

## Pruebas ya hechas (sin tocar producción)
El SQL se ejecutó entero en una transacción que se deshace, con un token falso, y se comprobó:
- Sin secretos configurados: la reserva se guarda y no se intenta avisar.
- Reserva normal: se encola 1 aviso con el texto correcto; nombres con `<b>` y `&` salen escapados.
- Reserva del panel, hora cerrada, cierre de salón y fechas de 2099: sin aviso.
- Reserva de la web antigua (sin zona, 1 persona, sin nota): 1 aviso con "Terraza" y "1 persona".
- El límite del salón (2 por servicio) sigue funcionando con el disparador nuevo.
- Tras la prueba, producción quedó intacta (sin columna, sin extensión, sin disparador, sin secretos).

## Deshacer
Está al final de `2026-11-12_aviso_telegram.sql`: borra el disparador y las funciones, y opcionalmente los secretos. No toca ninguna reserva.

## Privacidad
El mensaje incluye nombre y teléfono del cliente y va al Telegram del dueño (servidores de Telegram). Conviene que lo sepa el restaurante. El bot solo escribe al chat configurado.
