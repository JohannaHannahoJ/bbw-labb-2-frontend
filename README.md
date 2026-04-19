# lab-2-Frontend i kursen Backend-baserad webbutveckling, DT207G

**Genomförd av joha2102**

Detta projekt är en del av Laboration 2 i kursen Backend-baserad webbutveckling.  
Syftet med frontend-delen är att skapa ett användargränssnitt som kommunicerar med ett REST-API för att hantera arbetserfarenheter i ett CV. Del 1 av uppgiften, REST-API:t finns här: https://github.com/JohannaHannahoJ/bbw-labb-2-api

Frontend-applikationen är byggd med HTML, CSS och JavaScript och hämtar samt skickar data till ett backend-API via fetch-anrop.

## Om applikationen

Applikationen fungerar som ett användargränssnitt till ett REST API och hanterar arbetserfarenheter som lagras i en databas.

Funktionalitet:
- Visa alla arbetserfarenheter (GET)
- Lägga till nya arbetserfarenheter (POST)
- Ta bort arbetserfarenheter (DELETE)
- Sortering av arbetserfarenheter efter startdatum
- Validering av formulärdata i JavaScript
- Dynamisk rendering av innehåll i DOM

## Validering

Applikationen innehåller frontend-validering för att säkerställa korrekt inmatning innan data skickas till API:t:
- Obligatoriska fält måste fyllas i
- Startdatum och slutdatum kontrolleras
- Felmeddelanden visas direkt i gränssnittet
- Tomma eller ogiltiga värden skickas inte till backend

## Kommunikation med API

Frontend kommunicerar med backend via följande endpoint:
http://localhost:3500/api/workexperience

