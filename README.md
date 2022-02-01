# Instalacija i pokretanje projekta

Preduvjeti:
- instaliran Node.js i npm
- instaliran .Net 5
- pokrenuta postgresSQL baza podataka na portu 5432

# Pokretanje frontenda
Iz root foldera projekta uci u app/client folder. Tu je u terminalu potrebno pokrenuti naredbu `npm install` za instalaciju potrebnih npm paketa. Nakon toga,
aplikacija se pokrece naredbom `npm start`. U vasem browseru, na adresi `http://localhost:3000` bi se ubrzo trebala prikazati aplikacija. Inicijalno pokretanje moze potrajati.

# Pokretanje backenda
Preporucuje se da se aplikacija pokrece putem Visual Studia, radi lakseg setupa. U folderu app/services se nalazi solution file projekta. Ako otvorite taj file, projekt ce se otvoriti
u Visual Studiu. Pronadite file LibraryAPI/Properties/launchSettings.json. U LibraryAPI profil zalijepite ovo:
```
"LibraryAPI": {
      "commandName": "Project",
      "launchBrowser": true,
      "launchUrl": "swagger",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "dotnetRunMessages": "true",
      "applicationUrl": "http://localhost:5000"
}
```
Nakon toga otvorite Package Manager Console i pokrenite naredbu `update-database` kako bi pokrenuli migracije i generirali bazu podataka.
Provjerite jesu li podaci za login na vas postgreSQL server jednaki onima u appsettings.json fileu i ako nisu promjenite ih. Aplikaciju mozete pokrenuti nakon toga u
LibraryAPI profilu.
