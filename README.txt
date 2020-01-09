Welcome to MoonArt! 

This is my first serious project, and it's in a very early stage.

The important folders are api-rest-symfony (the API REST) and moonart-angular. Inside extra there is a stable version
from may 2019, but the current one should be stable too :>.

I upload this project hoping that it can be helpful for anyone learning Angular, or web development in general
but there are probably many things that could have been done better, I am not an Angular dev (yet :p)

I plan to release new versions in the future (once I am more experienced), and maybe host it in a real server in the 
future.

To run this project, you will need to follow some steps.

First, you will need to config the ports. In the code I reference to two paths, for Angular and Symfony.

I created two virtual hosts:
Angular -> URL moonart.io, and port 4200. (default)
Symfony -> URL moonart-api.io, and port 80.

I ran Symfony's part with Wamp. The folder 'moonart' is located inside www. (htdocs in case of Xampp).

Once you have imported the database on the server you are using, you will need to have that server running.
When it's done, you will need to run Angular's project, with live reload disabled. (ng serve --live-reload false) 

(The project used to crash if you started Angular before running the back-end server. It should be fixed but it may
still fail)

If you wanna get mod or admin permissions, you can only do that from database, for security purposes.

There are three roles, role_user, role_mod and role_admin. Each can do different stuff.

If you want to use the existing users, the 3 types of users are:

role_user
User: Nao
Pass: NaoNao123

role_mod
User: Mark
Pass: Marcos123

role_admin
User: Moon
Pass: MoonMoon1

The code comments are mostly in Spanish right now, and the documentation is Spanish only, and outdated (may 2019), 
but I will eventually translate them, and add some documentation. If you have any question, you can ask me at 
marcos.paez.calderon@gmail.com :)

------------------------------------------------------------------------------------------------------------------------

Known errors:

- AJAX calls failing


Future implementations (ordered by importance):

- Adapt to all screens with media queries and BS. Possible future version for phones with Cordova.

- Option to edit a picture. There is a button for it but it does nothing. (Tags, title, description)

- Fix problem with comments' length. It allows 300 chars, but it's saved as JSON, and emojis are 12 characters, so any
  comment with more than 300 chars will cause an error. Also add a counter like  (map themso they take 3 characters 
  instead, and save as normal text, not JSON. Also with special chars like ´ `)

- Visualize the followers and following in profile when clicking on them. Modal that shows users, with option to go to their
  profile, with the follow/unfollow button.