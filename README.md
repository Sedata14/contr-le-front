Projet gihtub

ce que j’ai fait


niveau 1
- affichage liste utilisateurs depuis l’API
- chaque utilisateur a photo, prenom, nom, email
- clic sur un utilisateur pour voir detail: age, société, ville etc
- creation des composants <UserList />, <UserCard />, <UserDetail />
- navigation entre liste et detail via react router
- loading et gestion erreur simple

niveau 2
- ajout recherche en temps réel sur prenom, nom et email
- tri par nom ou age
- pagination 10 utilisateurs par page
- gestion propre des erreurs avec try/catch

niveau 3
- ajout favoris avec clic sur etoile et persistance via localStorage
- theme clair/sombre avec bouton pour switch
- tri dynamique via select
- useMemo pour optimiser filtrage et tri
- composant de chargement visuel (fade-in cards)


ce qui a ete galere / problèmes survenus

- react router j’avais des erreurs avec <Link>
j’ai mis BrowserRouter dans index.tsx autour de <App /> et c’est passé

- toggle des favoris persistance + mise a jour de la card en temps reel
j’ai utilisé useState avec un tableau d’ids favoris et localStorage.setItem / getItem pour sauvegarder

- theme switch le bouton disparait selon le theme
j’ai ajouté des couleurs dynamiques selon le theme pour que le bouton soit visible tout le temps

- oubli de dépendances dans useEffect qui faisait rerender infini
j’ai ajouté les dépendances correctes et vérifié que ca loop plus

- petites erreurs de style qui faisaient disparaitre le fade-in
j’ai mis animation sur opacity et utilisé keyframes pour chaque card

- pagination slice correct des users + filtrage + tri en meme temps
j’ai utilisé useMemo pour filtrer et trier puis slice pour la page actuelle, testé pour pas casser l’ordre

Omar Chekkouri.
