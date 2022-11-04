# Ansible Automation

## Preparation

1. Install Ansible using [this](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) installation guide.

2. Install roles:

     ```ansible-galaxy install geerlingguy.apache```
     
    ```ansible-galaxy install geerlingguy.certbot```
    
   
## Configuration setup
1. After cloning the repo navigate to the repository.
2. Edit the Ansible env template file for to set your corresponding env variables using below command.


    ```nano ansible/roles/deploy_videoodyssee_frontend/templates/videoodyssee-fronted.env.j2```
3. This env file will look like this


    ```  
    REACT_APP_API_URL=https://api.videopipeline.freifunk.net
    REACT_APP_VOCTOWEB_API_URL=http://13.126.150.182:3000
    
    ```
4. Update REACT_APP_API_URL and REACT_APP_VOCTOWEB_API_URL to your corresponding API addresses.



## Deploy
1. Naviagate to the ansible folder.
2. Update the hosts.yaml file with your frontend domain name. The hosts.yaml file will look like this

   ```
     all:
     children:
       dashboard.videoodyssee-frontend:
         hosts:
           videopipeline.freifunk.net:
             domains:
               - dashboard.videopipeline.freifunk.net
             email: web+dashboard.videopipeline@freifunk.net
     
   ```
3. Then run the videoodyssee-api-playbook.yaml playbook using the below command:

`ansible-playbook -i hosts.yaml videoodyssee-frontend-playbook.yaml  -u vm_username --ask-become-pass`

