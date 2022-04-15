![Logo](https://www.thehungarianpaprika.hu/hu/papkepek/2018/11/magyar-paprika-gulyas.jpg)
## 😎 i-zőrzők (iDrink)
Az i-zőrzők egy egyszerű webes applikáció, amelyen országszerte lehet hirdetni a magyar ízvilág csodáit! iDrink néven látott világot, amely házikészítésű magyar italok hirdetésének szolgált volna platformot. De szomorúan tudomásul kellett vennünk, hogy hasonló néven már létezik egy webes italbolt, illetve arra is rá kellett eszmélnünk, hogy megtagadni az online teret a jó kis házi szalonkák, kolbászok és tepertők hirdetésétől minden bizonnyal főbenjáró bűnnek számítana.

## 💡 Demo - Webes applikációnk Herokun publikálva

https://safe-beach-25692.herokuapp.com/

## 📄 PowerPoint Prezentáció

**presentation/SHS-i-zőrzők.pptx** magyarul vagy **presentation/SHS-i-zőrzők-EN.pptx** angolul. Alternatív megoldásként magyar verzió letölthető innen: https://docs.google.com/presentation/d/1vpr7dklPS8z1RmJykIH0YHc67zKkuvpj/edit?usp=sharing&ouid=107841911253819226034&rtpof=true&sd=true illetve angolul: https://docs.google.com/presentation/d/17zO3nlzGfE6wVZCl-8RSOnvwzC4F4V3T/edit?usp=sharing&ouid=107841911253819226034&rtpof=true&sd=true

## 🛠 Technológia
| Front-End   | Back-End   | Database   | Deployment  |
| :-----------| :----------| :----------| :-----------|
| HTML5   | Node.js  | Mongoose  | Heroku   |
| CSS3   | ExpressJS  | MongoDB  | MongoDB Atlas   |
| Bootstrap 5   | EJS  |   | Cloudinary   |
| Javascript   |   |   | Git   |
## ⚖️ Metodológia
- Model-View-Control(MVC) Architectúra.
- [Bootsrap 5](https://getbootstrap.com/?ref=https://githubhelp.com), CSS keretrendszerét favorizáltuk az esetek túlnyomó többségében, hiszen relatíve könnyedén lehet vele teljesen egyszerű, de mégis szép, letisztult UI-t varázsolni.
- [Express.js](https://expressjs.com/?ref=https://githubhelp.com), Node.js keretrendszere segítségével épült fel a Back-End.
- [PassportJs](https://github.com/jaredhanson/passport?ref=https://githubhelp.com) hitelesítés és meghatalmazás létrehozásában játszott szerepet. (Authentication & Authorization)
- [MongoDB Atlas](https://www.mongodb.com/)-t használjuk adatbázisunknak, ami jó magyarosan egy 'multi-cloud, multi-region database' a MongoDB alkotóitól.
- [Embedded Javascript Templates (EJS)](https://ejs.co/?ref=https://githubhelp.com) a HTML-t helyettesítette, ismételten jó magyarosan ez egy front-end 'templating language', hasonló, mint a Jinja Pythonban. Igazából EJS-t nem használtunk volna, ha nem teljesen kezdők lennénk és legalább az egyikünk rendelkezne némi tudásal React vagy Angular területén.
- Alapvető biztonság [Express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize) és [Sanitize-html](https://www.npmjs.com/package/sanitize-html) révén. Például ha a felhasználó mókás kedvében alert parancsot adna meg hirdetés nevének, akkor az nem engedélyezett.
- [Cloudinary](https://cloudinary.com) a képek tárolására szolgál.
- [Heroku](https://www.heroku.com), mint felhőszolgáltató, ahova publikáltuk(deploy) az apllikációnkat.
## ⚙️ Funkciók
- Regisztráció, bejelentkezés, admin felhasználó
- RESTful 'route' (Create, Read, Update, Delete) az iDrinkhez(hirdetésekhez).
- Új hirdetést létrehozni, illetve meglévőt szerkeszteni csak hitelesítés(authentication) és meghatalmazás(authorization) után lehetséges.
- Hitelesítés és meghatalmazás mellett a hirdetés létrehozása illetve szerkesztése rendelkezik jóváhagyással/megerőssítéssel(validation).
- [Mapbox](https://www.mapbox.com/) révén két különböző térkép is implementálva lett. Egy 'cluster-map', ami a hirdetéseknél látszódik és pontokban jelöli, hogy az ország mely pontjairól lettek feladva a hirdetések, igazából ez a kereső funkciót helyettesíti. A másik meg egy mini map, amely a hirdetések megtekintésénél jelenik meg.
## 🚀 Program futtatása lokálisan

Először is hozzon létre egy .env fájlt a következő változókkal, majd értelemszerűen saját regisztrált adataival egészítse ki:
```bash
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
MAPBOX_TOKEN=
DB_URL=
SECRET=
```
Bizonyosodjon meg róla, hogy a [MongoDB](https://www.mongodb.com/docs/manual/installation/?ref=https://githubhelp.com) telepítve van a gépén.
Lépjen be az iDrink mappába és ott nyisson meg egy terminált(Parancssor, Git Bash, stb.) majd írja be a következő parancsot a MongoDB adatbázis inicializáláshoz:
```bash
mongod
```
Egy második terminálban írja a következőt ahhoz, hogy hozzáférjünk a MongoDB adatbázishoz Mongoose segítségével:
```bash
mongo
```
Egy harmadik terminálban a függőségek telepítéséhez az alábbi parancs megadására van szükség:
```bash
npm install
```
És végezetül a program futtatása (ugyanott a harmadik ablakban, telepítés után):
```bash
npm start
```
Amennyiben van nodemon telepítve, akkor alternatív lehetőségként így is el lehet indítani:
```bash
nodemon app.js
```
Ha lokális üres adatbázisunkat szeretnénk seedelni:
```bash
node seeds/index.js
```
## 📐 Tesztelés
A Herokun publikált applikációnk [URL](https://safe-beach-25692.herokuapp.com/)-jét bemásolva a [PageSpeed Insights (PSI)](https://pagespeed.web.dev/) nevezetű oldalon teszteltük.
A PageSpeed Insights [Lighthouse](https://developers.google.com/web/tools/lighthouse) segítségével analízálja a megadott URL-t mind mobil (mobile) és asztali (desktop) eszkőzön, majd készít értékelést minkettőről külön-külön. Bővebb információ angolul [itt](https://developers.google.com/speed/docs/insights/v5/about) érhető el. 
## 🔒 Készítették
- **S**zabó Sándor Péter
- **H**ajdú Péter
- **S**zikora Norbert
## 📣 Kredit
Az SHS i-zőrzők(iDrink) ötletét és egyben vázát Colt Steele [Udemy](https://www.udemy.com/) kurzusának elvégzése adta: [The Web Developer Bootcamp 2022](https://www.udemy.com/course/the-web-developer-bootcamp/)! 
