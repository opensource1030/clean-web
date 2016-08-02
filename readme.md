# Installation Process

- **Install gulp and bower globally**
    - *gulp* : 
    
    ```
    npm install -g gulp
    ```
    - *bower* :
     ```
    npm install -g bower
    ```
- **Install all project dependencies**
 
    ``` 
    npm install
    ```
- **Install front end packages**

    ```
    bower install
    ```
- **To build the Front End**  ( It will automatically run the html in default browser and started to watch changes )
     ```
        gulp
    ```
    
   

**Note: In case of _EACCES: permission denied_ issue for bower:**

```
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config

```