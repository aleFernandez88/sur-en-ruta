# Fuente de la foto de Hero

**`ruta-placeholder.jpg` es una muestra provisoria, NO la foto final.** La trajo Ale
(2026-08-24) desde `C:\Users\zhuki\Downloads\18137.jpg` como referencia de encuadre/luz para
armar el layout del Hero mientras se coordina la foto real con Verzet Group.

## Qué falta antes de que esto sea publicable

1. **Procedencia/licencia sin verificar.** No se confirmó de dónde sale este archivo ni bajo qué
   licencia — no puede quedar en un deploy real así como está. Mismo criterio que
   `src/assets/mapa/FUENTE.md` para la geometría del mapa: no se asume, se verifica.
2. **El terreno de fondo no es de Uruguay.** La silueta de montaña en el horizonte no corresponde
   — Uruguay no tiene ese relieve (su punto más alto, el Cerro Catedral, son ~514 m, sin nada
   parecido a una cordillera visible desde una ruta). Es exactamente el riesgo de credibilidad que
   ya había marcado el plan (`docs/planes/2026-08-20-landing-inversores.md`, punto f y punto 5):
   un inversor uruguayo que reconoce el paisaje va a notar que esa no es una ruta del país. Cuando
   se coordine la foto real con Verzet Group, señalar esto explícitamente en el brief (ver ficha
   técnica pasada a Ale en la conversación del 2026-08-24): terreno de pampa/serranía, sin
   cordillera al fondo.
3. **No hay camper/motorhome en el cuadro** — el plan pedía que el vehículo apareciera chico en la
   escena, esta muestra no lo tiene. Aceptado a propósito como límite de la muestra, no de la foto
   final.

## Por qué se usa igual por ahora

El resto del encuadre (ruta perdiéndose al horizonte, doble línea amarilla continua, luz de hora
dorada, cielo despejado en la mitad superior para la tipografía) cumple bien la ficha técnica, y
sirve para validar el layout/tratamiento del Hero (overlay, contraste de texto, recorte
responsive) sin esperar la foto definitiva. **Reemplazar por la foto real de Verzet Group antes de
cualquier deploy a producción** — no lo hace ningún agente, lo decide Ale.
