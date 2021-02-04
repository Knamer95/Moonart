# MoonArt

MoonArt is a place to upload your art, and share it with the world. Find new artists, make friends, and enjoy liking/sharing your favourite drawings.

The main purpose of this project is learning Angular, REST API, and how to use an ORM. Feel free to use it for learning purposes. :)


## Getting started 🚀

This instructions will allow you to get a functioning copy of MoonArt on your machine, for developing and learning purposes. 


## Installation 🔧

This guide is made for a Windows system. Please use the equivalents for other OS.

In order to make the project work, you'll need to follow the next steps:

1) Install [npm](https://www.npmjs.com/).

2) Install a web-server if you don't have any (XAMPP, WAMP, LAMP, ...). I recommend WAMP, since it's the one I used.

3) Download the project code, and place it inside the web-server. (In WAMP's case, /wamp64/www/moonart)

4) Navigate through the terminal until you reach the Angular project folder.

```
> cd D:\Programs\wamp64\www\moonart\moonart-angular
```

5) Execute the command `npm install` in the console.

```
D:\Programs\wamp64\www\moonart\moonart-angular> npm install
```

_This will install everything from package.json, so it's important to be located at the Angular project root when running the command._

6) Create two virtual hosts. In Windows, it should be located in somewhere like `C:\Windows\System32\drivers\etc`

Add the lines:

```
127.0.0.1 moonart.io
127.0.0.1 moonart-api.io
```

7) Change (or create a httpd-vhosts.conf) file. This was needed for WAMP, it may be different on other platforms. THere's an example of how your file should look like in the misc folder.

8) Import the database queries from moonDB.sql (located at the root of the project). I used MySQL Workbench. The credentials are:

```
User: root
Pass: (empty)
```

And you should be ready to go!

**Note: You don't need to install Symfony to run the project.


## Running the project ⚙️

In order to run the project, I recommend first to check that everything is working properly.

Check that your web-server is using port 80, and that it's running properly. If you can see a Symfony message when opening the [API](http://moonart-api.io/), that will mean everything on the back-end is working properly.

Run the Angular project from the terminal:

```
ng serve --live-reload false
```

The reason of setting live reloading to false is that in a developer environment, Angular reloads every time it detects some changes. Yhis means that if you upload an image (which will be saved in /api-rest-symfony/public), it will consider this a change, and it will reload the script, and it won't redirect to home after uploading it, like it should.

If something is not working properly, feel free to message me! The email is specified below, in Contribute.


## Deployment 📦

You can check how to deploy the project in the Angular [documentation](https://angular.io/guide/deployment).


## Built with 🛠️

I used the following tools:

* [npm](https://www.npmjs.com/) - Package Manager (Angular)
* [composer](https://getcomposer.org/ - Package Manager  (Symfony)
* [Angular 7.2.0](https://angular.io/docs) - As front-end framework
* [Symfony 4.2.7](https://symfony.com/doc/current/index.html) - As back-end framework
* [MySQL](https://dev.mysql.com/doc/) - As DB language
* [Doctrine](https://www.doctrine-project.org/projects/doctrine-orm/en/2.8/index.html) - As ORM


## Contribute 🖇️

Would you like to contribute, or do you have any suggestion? Send an email to marcos.paez.calderon@gmail.com, and I'll try to answer as soon as possible.

You can find a list of the things that are yet to be implemented, and current known bugs, at `/toDo.txt`.


## Greetings 🎁

* Thanks to [Villanuevand](https://github.com/Villanuevand) for the README.md template. ❤️