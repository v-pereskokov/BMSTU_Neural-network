# BMSTU Neural network course

[![Build Status](https://travis-ci.com/vladpereskokov/BMSTU_Neural-network.svg?token=vgWpgFdW3m8asKepzCnQ&branch=lab-01)](https://travis-ci.com/vladpereskokov/BMSTU_Neural-network)  

### Deploy
~~Auto deploy from Travis CI to Heroku~~    
[Simple activate function](https://bmstu-neural-network.herokuapp.com/api/v1/lab_01/lazy_magic)    
[Difficult activate function](https://bmstu-neural-network.herokuapp.com/api/v1/lab_01/real_magic)    

***POST request***  
*https://bmstu-neural-network.herokuapp.com/api/v1/lab_01/*  

| API           | Request       |  
|:-------------:|:-------------:|  
| lazy_magic    | {"vars": [x1, x2, x3, x4]} |
| real_magic    | {"vars": [x1, x2, x3, x4]} |


### Description
Implementation algorithms of neural network by python 3. And web interface to get result of training systems. 

### Seminars
```bash
    git checkout lab-[lab number]
```  
Example:  
```bash
    git checkout lab-01
```

### Development stack
* Paper and Pencil
* Python 3.6
* Flask
* Travis
* Heroku

### Run
#### Install dependencies
```bash
    pip install -r requirements.txt
```

#### Start
```bash
    python<3> main.py 
```
