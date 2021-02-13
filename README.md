# MoonArt

MoonArt is a place to upload your art, and share it with the world. Find new artists, make friends, and enjoy liking/sharing your favourite drawings.

The main purpose of this project is learning `Angular`, `REST API`, and how to use an `ORM`. Feel free to use it for learning purposes. :)


## Getting started 🚀

This instructions will allow you to get a functioning copy of MoonArt on your machine, for developing and learning purposes. 


## Installation 🔧

This guide is made for a Windows system. Please use the equivalents for other OS.

In order to make the project work, you'll need to follow the next steps:

1) Install [npm](https://www.npmjs.com/).


2) Install a web-server if you don't have any (`XAMPP`, `WAMP`, `LAMP`, ...). I recommend `WAMP`, since it's the one I used.


3) Download the project code, and place it inside the web-server. (In `WAMP`'s case, it should look like `/wamp64/www/moonart/*folders*`).
_It's important that the folder is located at the root of the web-server, since I used absolute paths in the vhost config and in some parts of the code (I will change those to relative), and the folder containing the folders `api-rest-symfony` and `moonart-angular` has to be named `moonart` (root folder)_


4) Navigate through the terminal until you reach the `Angular` project folder.

```
> cd D:\Programs\wamp64\www\moonart\moonart-angular
```


5) Execute the command `npm install`. This should install everything from `package-lock.json`.

```
D:\Programs\wamp64\www\moonart\moonart-angular> npm install
```

_If some dependency fails, you can run `-g @angular/cli@7.3.8` in the console instead. It's important to specify the version (after the @), or else it will install the latest Angular version... If you have any error, and are unable to fix it, please contact me. (My email can be found below, in `#Contribute`)._


6) Create two virtual hosts. In Windows, it should be located in somewhere like `C:\Windows\System32\drivers\etc`. Add the lines:

```
127.0.0.1 moonart.io
127.0.0.1 moonart-api.io
```

_You will need administrator permissions to edit this file._

7) Change (or create a `httpd-vhosts.conf`) file. This was needed for `WAMP`, it may be different on other platforms. There's an example of how your file should look like in the `misc` folder. The CORS line must be commented in current `WAMP` versions.


8) Add these lines in `httpd.conf`, after `IfModule dir_module` (to avoid CORS issue)

```
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin: *
</IfModule>
```

_It should look something like this_

> \<IfModule dir_module>
>    DirectoryIndex index.php index.php3 index.html index.htm
>\</IfModule\>

>\<IfModule mod_headers.c\>
>    Header set Access-Control-Allow-Origin: *
>\</IfModule\>

_**Note: I changed it so now the httpd.conf part is not needed anymore. The way it works now is by allowing apache on your firewall (Control Panel => Windows Defender Firewall => Allow an app to go through Windows Defender => Allow another app => Search for apache (in my case, C://wamp64/bin/apache/apache2.4.37/bin/httpd.exe)._

_I modified the nelmio\_cors.yaml (moonart/api-rest-symfony/config/packages) file to allow origin and headers from * (this is for a developer environment, don't do this in production)._

_After that, I allowed my network to access the REST API (since that's where the CORS issue happens), adding the line 'Require ip 192.168.1.0' in httpd-vhosts.conf (attached in moonart/misc, you can copy paste it)._

_Then if you want to have access to the server from every device in your network, go to 'moonart/moonart-angular/src/app/services', and add your private IP (mine is commented, it should look like that). There can only be one url, so comment the other one._

_Once all this is done, you can run the Angular server with 'ng serve --host 192.168.1.x --live-reload false', being that your private IP, and you will be able to access to MoonArt from every device in your network!_

_Since your virtual host may only be on one of your devices, you can access to MoonArt from 192.168.1.x:4200 from everywhere. Note that you can't access with moonart.io if you run the project in a host, and vice-versa_

\-\-\-

9) Import the database queries from moonDB.sql (located at the root of the project). I used MySQL Workbench. The credentials are:

```
User: root
Pass: (empty)
```


10) Extract the files from `moonart/api-rest-symfony/api-rest-symfony.rar` on the `Symfony` root path (`moonart/api-rest-symfony/*here*`). This way, you won't need to install `Symfony`. If you wanted to, I installed the skeleton, and some libraries that you can find there.

And you should be ready to go!

\-\-\-

Notes:

If you were running your web-server, you may need to reload it. 

You may encounter a problem the first time you log in into an account. Reloading the page fixes it, and it doesn't seem to happen ever again, even if you log in other accounts. If the images aren't loading, please check the console. It may be due to `Cross-Origin` requests being blocked. (In `WAMP`, adding the lines from point 8 solved it for me)

I will give the choice to the user to set the paths of the webpage in a future version (using set vhosts or not), instead of forcing my two virtual hosts and making things overcomplicated...


## Running the project ⚙️

In order to run the project, I recommend first to check that everything is working properly.

Check that your web-server is using port `80`, and that it's running properly. If you can see a `Symfony` message when opening the [API](http://moonart-api.io/), that will mean everything on the back-end is working properly.

Run the `Angular` project from the terminal:

```
ng serve --live-reload false
```

The reason of setting live reloading to false is that in a developer environment, `Angular` reloads every time it detects some changes. This means that if you upload an image (which will be saved in `moonart/api-rest-symfony/public`), it will consider this a change, and it will reload the script, and it won't redirect to home after uploading it, like it should.

If something is not working properly, feel free to message me! The email is specified below, in `#Contribute`.


## Deployment 📦

You can check how to deploy the project in the `Angular` [documentation](https://angular.io/guide/deployment).


## Built with 🛠️

I used the following tools:

* [npm](https://www.npmjs.com/) - Package Manager (Angular)
* [composer](https://getcomposer.org/) - Package Manager  (Symfony)
* [Angular 7.2.0](https://angular.io/docs) - As front-end framework
* [Symfony 4.2.7](https://symfony.com/doc/current/index.html) - As back-end framework
* [MySQL](https://dev.mysql.com/doc/) - As DB language
* [Doctrine](https://www.doctrine-project.org/projects/doctrine-orm/en/2.8/index.html) - As ORM


## Contribute 🖇️

Would you like to contribute, or do you have any suggestion? Send an email to `ognao7@gmail.com`, and I'll try to answer as soon as possible.

You can find a list of the things that are yet to be implemented, and current known bugs, at `/toDo.txt`.


## Greetings 🎁

I would like to thank:

* [Villanuevand](https://github.com/Villanuevand) for the README.md template.
* `https://pixabay.com/` for providing free to share pictures.
* [DeviantArt](https://www.deviantart.com/) for the designing ideas (This webpage is based on `DeviantArt` mostly)
* And special thanks to everyone that made MoonArt possible, my teachers, friends that helped me test things out, etc.