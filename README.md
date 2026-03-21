# Projekt
Book Club är en applikation där användare kan söka efter böcker och läsa detaljerad bokinformation tillsammans med skapade recensioner. En registrerad användare kan skapa och hantera sina egna recensioner. Applikationen består av två delar: en frontend-lösning skapad med Vite, React och TypeScript och en backend-lösning skapad som ett ASP.NET Core Web API med ASP.NET Core Identity för registrering och inloggning. För att samla all information på ett ställe innehåller denna README-fil information om den fullständiga lösningen (frontend och backend). 

## Arkitektur
Applikationen är uppbyggd enligt en klassisk fullstack-struktur. Frontend-lösningen innehåller sidkomponenter, återanvändbarar komponenter och TypeScript-interfaces. Den innehåller även services som hanterar API-anrop mot både Google Books API och den egenskapade backend-lösningen samt en AuthContext-fil som hanterar autentisering för skyddat innehåll. En nyckel från Google Books API finns lagrad i en .env-fil. 
<br><br>
Följande komponenter har skapats: 

### Sidkomponenter
* **HomePage:** Applikationens startsida med boklista, sökbar och sökresultat. 
* **BookDetailPage:** En sida för en enskild bok.
* **LoginPage:** Inloggningsformulär. 
* **SignupPage:** Registreringsformulär. 
* **AdminPage (protected):** Sida där en inloggad användare kan se och hantera sina recensioner. 
* **LayoutPage:** Generell sidstruktur som visar navbar och footer på samtliga sidor. 

### Andra komponenter
* **Navbar:** Applikationens navbar.
* **Footer:** Applikationens footer. 
* **SearchBar:** Sökbar för att söka efter böcker. 
* **SearchResults:** Sökresultaten som presenteras. 
* **BookList:** En lista med böcker som presenteras på startsidan innan en sökning genomförts. 
* **AdminReviews:** En inloggad användares reviews. 
* **ReviewForm:** Formulär för att skapa en ny recension. 

Backendlösningen är skapad som ett ASP.NET Core Web API och är strukturerat i modeller, controllers och Data Transfer Objects (DTOs) som används för att kontrollera data som skickas mellan backend och frontend. Den innehåller även en ApplicationDbContext-fil som kopplar applikationen till databasen via Entity Framework Core. 

## Applikationens funktionalitet
Applikationen erbjuder följande funktioner: 
* Söka efter böcker via Google Books API. 
* Visa detaljerad information om böcker på individuella sidor. 
* Registrera konto och logga in. 
* Skapa recensioner med text och betyg 1-5. 
* Uppdatera och ta bort egna recensioner. 

## Teknologier använda
Frontend:
* **React:** Strukturerar användargränssnittet med komponenter. 
* **TypeScript:** Används för att skriva kod med typkontroll. 
* **React Router:** För att hantera navigering. 
* **Context API:** Används för att hantera inloggad användare utan att behöva skicka data genom flera komponenter. 
* **CSS:** Styling. 
Backend: 
* **ASP.NET Core Web API:** Valt ramvekt för att bygga ett API i .NET.
* **Entity Framework Core:** Ett ORM-verktyg för att kommunicera med databasen. 
* **ASP.NET Identity:** För autentisering och användarhantering. 
* **JWT (JSON Web Tokens):** Autentiserar användare genom att ett token skickas med i API-anrop.
* **SQLite:** Vald databas som lagrar data lokalt i en fil. 
Övrigt: 
* **Google Books API:** Valt externt API som används för att hämta bokdata. 
