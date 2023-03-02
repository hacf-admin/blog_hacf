---
folder: ha_acces_ext_npm
visibleInCMS: true
draft: false
date: 2022-05-04
lastmod: null
level: Intermédiaire
author: mcfly
url_hacf: https://forum.hacf.fr/t/acces-de-l-exterieur-en-https-avec-nginx-proxy-manager/1761
series: null
title: Accèder a Home Assistant depuis l'exterieur en HTTPS avec Nginx Proxy Manager
aliases:
  - /ha_acces_ext_npm
images: img/acces-exterieur-nginx-proxy-manger.jpg
description: Comment accéder depuis l'extérieur a votre système domotique, Home
  Assistant, avec l'add-on Nginx Proxy Manager.
categories:
  - Réseau
tags:
  - acces-exterieur
  - https
  - ssl
  - maria-db
---
Vous avez choisi d'accéder à Home Assistant depuis l'extérieur avec la solution Nginx Proxy Manager.

Nous allons voir comment mettre en place et sécuriser l'accès à votre instance Domotique, et par la même occasion de rendre accessible d'autres services, hébergés chez vous, depuis l'extérieur.

![Schéma d'une connexion extérieur](img/schema_acces-exterieur.png "Schéma d'une connexion extérieur")



**Version utilisée :** Home Assistant OS 2022.11.4

**Prérequis :** 

* Avoir un Nom de domaine (NDD), qui pointe vers votre adresse IP ([connaître votre IP](https://www.mon-ip.com/))
* Nettoyer les anciennes traces de certificat (si déjà installé avant, supprimer le contenu du dossier SSL)
* Ouvrir les ports 443 et 80 de votre routeur, et redirigé les vers votre Home Assistant

L'installation de `Nginx Proxy Manager` requiert d'installer l'add-on `Maria DB`.

## Installer l'add-on Maria DB.

> Si besoin, [comment installer un add-on officiel](installer-un-add-on-officiel-ou-non-officiel-sur-home-assistant)
![Add-on MariaDB](img/add-on_maria-db.png "Add-on MariaDB")

### Configurer Maria DB

![Configuration de l'add-on MariaDB](img/add-on_maria-db_configuration.png "Configuration de l'add-on MariaDB")

Pour commencer simplement, il vous suffit de rentrer un mot de passe et un utilisateur (si vous souhaitez le changer)

> Entourer votre mot de passe par des `"votre.p@ssword"` s'il contient des caractères spéciaux.
Il vous reste à enregistrer et à démarrer l'add-on.

Voici le resultat des logs:

```
s6-rc: info: service s6rc-oneshot-runner: starting
s6-rc: info: service s6rc-oneshot-runner successfully started
s6-rc: info: service fix-attrs: starting
s6-rc: info: service fix-attrs successfully started
s6-rc: info: service legacy-cont-init: starting
s6-rc: info: service legacy-cont-init successfully started
s6-rc: info: service legacy-services: starting
services-up: info: copying legacy longrun mariadb (no readiness notification)
services-up: info: copying legacy longrun mariadb-lock (no readiness notification)
[15:10:06] INFO: Create a new mariadb initial system
[15:10:11] INFO: Starting MariaDB
221123 15:10:12 mysqld_safe Logging to '/data/databases/mariadb.err'.
221123 15:10:12 mysqld_safe Starting mariadbd daemon with databases from /data/databases
221123 15:10:12 mysqld_safe Starting mariadbd daemon with databases from /data/databases
2022-11-23 15:10:12 0 [Note] /usr/bin/mariadbd (server 10.6.8-MariaDB) starting as process 294 ...
2022-11-23 15:10:12 0 [Note] InnoDB: Compressed tables use zlib 1.2.12
2022-11-23 15:10:12 0 [Note] InnoDB: Number of pools: 1
2022-11-23 15:10:12 0 [Note] InnoDB: Using ARMv8 crc32 instructions
2022-11-23 15:10:12 0 [Note] mariadbd: O_TMPFILE is not supported on /var/tmp (disabling future attempts)
2022-11-23 15:10:12 0 [Note] InnoDB: Using Linux native AIO
2022-11-23 15:10:12 0 [Note] InnoDB: Initializing buffer pool, total size = 134217728, chunk size = 134217728
2022-11-23 15:10:12 0 [Note] InnoDB: Completed initialization of buffer pool
2022-11-23 15:10:12 0 [Note] InnoDB: 128 rollback segments are active.
2022-11-23 15:10:12 0 [Note] InnoDB: Creating shared tablespace for temporary tables
2022-11-23 15:10:12 0 [Note] InnoDB: Setting file './ibtmp1' size to 12 MB. Physically writing the file full; Please wait ...
2022-11-23 15:10:12 0 [Note] InnoDB: File './ibtmp1' size is now 12 MB.
2022-11-23 15:10:12 0 [Note] InnoDB: 10.6.8 started; log sequence number 42319; transaction id 14
2022-11-23 15:10:12 0 [Note] Plugin 'FEEDBACK' is disabled.
2022-11-23 15:10:12 0 [Note] InnoDB: Loading buffer pool(s) from /data/databases/ib_buffer_pool
2022-11-23 15:10:12 0 [Note] Server socket created on IP: '0.0.0.0'.
2022-11-23 15:10:12 0 [Note] Server socket created on IP: '::'.
2022-11-23 15:10:12 0 [Note] InnoDB: Buffer pool(s) load completed at 221123 15:10:12
2022-11-23 15:10:12 0 [Warning] 'proxies_priv' entry '@% root@core-mariadb' ignored in --skip-name-resolve mode.
2022-11-23 15:10:12 0 [Note] /usr/bin/mariadbd: ready for connections.
Version: '10.6.8-MariaDB'  socket: '/run/mysqld/mysqld.sock'  port: 3306  MariaDB Server
[15:10:13] INFO: Check data integrity and fix corruptions
mysql.column_stats                                 OK
mysql.columns_priv                                 OK
mysql.db                                           OK
mysql.event                                        OK
mysql.func                                         OK
mysql.global_priv                                  OK
mysql.gtid_slave_pos                               OK
mysql.help_category                                OK
mysql.help_keyword                                 OK
mysql.help_relation                                OK
mysql.help_topic                                   OK
mysql.index_stats                                  OK
mysql.innodb_index_stats                           OK
mysql.innodb_table_stats                           OK
mysql.plugin                                       OK
mysql.proc                                         OK
mysql.procs_priv                                   OK
mysql.proxies_priv                                 OK
mysql.roles_mapping                                OK
mysql.servers                                      OK
mysql.table_stats                                  OK
mysql.tables_priv                                  OK
mysql.time_zone                                    OK
mysql.time_zone_leap_second                        OK
mysql.time_zone_name                               OK
mysql.time_zone_transition                         OK
mysql.time_zone_transition_type                    OK
mysql.transaction_registry                         OK
sys.sys_config                                     OK
[15:10:13] INFO: Ensuring internal database upgrades are performed
[15:10:14] INFO: Ensure databases exists
[15:10:14] INFO: Create database homeassistant
[15:10:14] INFO: Ensure users exists and are updated
[15:10:14] INFO: Create user homeassistant
[15:10:14] INFO: Init/Update rights
[15:10:15] INFO: Granting all privileges to homeassistant on homeassistant
[15:10:16] INFO: Successfully send service information to Home Assistant.
```

Une fois le service lancé, nous allons ajouter le `recorder` dans le fichier `configuration.yaml` de Home Assistant.

Rendez-vous donc dans `File Editor` ou `Visual Studio Code` puis ajouter cette ligne à personnaliser avec vos informations de connexion.

## Installer l'add-on Nginx Proxy Manager.

> Si besoin, [comment installer un add-on officiel](installer-un-add-on-officiel-ou-non-officiel-sur-home-assistant)
![Add-on Nginx Proxy Manager](img/add-on_nginx_proxy_manager.png "Add-on Nginx Proxy Manager")

La configuration par défaut suffit.

![Configuration de l'add-on Nginx Proxy Manager](img/add-on_nginx_proxy_manager_configuration.png "Configuration de l'add-on Nginx Proxy Manager")

Démarrer le service et regarder les logs :

> Lorsque vous démarrez NPM, il s'éteint tout de suite, mais ne vous inquiétez pas, regardez les logs.
```
-----------------------------------------------------------
 Add-on version: 0.12.3
 You are running the latest version of this add-on.
 System: Home Assistant OS 9.3  (aarch64 / raspberrypi4-64)
 Home Assistant Core: 2022.11.4
 Home Assistant Supervisor: 2022.10.2
-----------------------------------------------------------
 Please, share the above information when looking for help
 or support in, e.g., GitHub, forums or the Discord chat.
-----------------------------------------------------------
cont-init: info: /etc/cont-init.d/00-banner.sh exited 0
cont-init: info: running /etc/cont-init.d/01-log-level.sh
cont-init: info: /etc/cont-init.d/01-log-level.sh exited 0
cont-init: info: running /etc/cont-init.d/mysql.sh
cont-init: info: /etc/cont-init.d/mysql.sh exited 0
cont-init: info: running /etc/cont-init.d/nginx.sh
cont-init: info: /etc/cont-init.d/nginx.sh exited 0
cont-init: info: running /etc/cont-init.d/npm.sh
[15:23:14] INFO: Generating dummy SSL certificate
Generating a RSA private key
....................................................+++++
.................................................................+++++
writing new private key to '/data/nginx/dummykey.pem'
-----
cont-init: info: /etc/cont-init.d/npm.sh exited 0
s6-rc: info: service legacy-cont-init successfully started
s6-rc: info: service legacy-services: starting
services-up: info: copying legacy longrun manager (no readiness notification)
services-up: info: copying legacy longrun nginx (no readiness notification)
s6-rc: info: service legacy-services successfully started
[15:23:15] INFO: Starting NGinx...
[15:23:15] INFO: Starting the Manager...
[11/23/2022] [3:23:15 PM] [Global   ] › ℹ  info      Manual db configuration already exists, skipping config creation from environment variables
[11/23/2022] [3:23:22 PM] [Migrate  ] › ℹ  info      Current database version: none
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] Migrating Up...
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] auth Table created
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] user Table created
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] user_permission Table created
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] proxy_host Table created
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] redirection_host Table created
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] dead_host Table created
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] stream Table created
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] access_list Table created
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] certificate Table created
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] access_list_auth Table created
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [initial-schema] audit_log Table created
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [websockets] Migrating Up...
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [websockets] proxy_host Table altered
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [forward_host] Migrating Up...
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [forward_host] proxy_host Table altered
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [http2_support] Migrating Up...
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [http2_support] proxy_host Table altered
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [http2_support] redirection_host Table altered
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [http2_support] dead_host Table altered
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [forward_scheme] Migrating Up...
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [forward_scheme] proxy_host Table altered
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [disabled] Migrating Up...
[11/23/2022] [3:23:23 PM] [Migrate  ] › ℹ  info      [disabled] proxy_host Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [disabled] redirection_host Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [disabled] dead_host Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [disabled] stream Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [custom_locations] Migrating Up...
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [custom_locations] proxy_host Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [hsts] Migrating Up...
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [hsts] proxy_host Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [hsts] redirection_host Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [hsts] dead_host Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [settings] Migrating Up...
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [settings] setting Table created
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [access_list_client] Migrating Up...
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [access_list_client] access_list_client Table created
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [access_list_client] access_list Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [access_list_client_fix] Migrating Up...
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [access_list_client_fix] access_list Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [pass_auth] Migrating Up...
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [pass_auth] access_list Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [redirection_scheme] Migrating Up...
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [redirection_scheme] redirection_host Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [redirection_status_code] Migrating Up...
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [redirection_status_code] redirection_host Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [stream_domain] Migrating Up...
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [stream_domain] stream Table altered
[11/23/2022] [3:23:24 PM] [Migrate  ] › ℹ  info      [stream_domain] Migrating Up...
[11/23/2022] [3:23:24 PM] [Setup    ] › ℹ  info      Creating a new JWT key pair...
[11/23/2022] [3:23:49 PM] [Setup    ] › ℹ  info      Wrote JWT key pair to config file: /opt/nginx-proxy-manager/config/production.json
[11/23/2022] [3:23:49 PM] [Setup    ] › ℹ  info      Creating a new user: admin@example.com with password: changeme
[11/23/2022] [3:23:50 PM] [Setup    ] › ℹ  info      Initial admin setup completed
[11/23/2022] [3:23:51 PM] [Setup    ] › ℹ  info      Default settings added
[11/23/2022] [3:23:51 PM] [Setup    ] › ℹ  info      Logrotate Timer initialized
[11/23/2022] [3:23:51 PM] [Setup    ] › ℹ  info      Logrotate completed.
[11/23/2022] [3:23:51 PM] [IP Ranges] › ℹ  info      Fetching IP Ranges from online services...
[11/23/2022] [3:23:51 PM] [IP Ranges] › ℹ  info      Fetching https://ip-ranges.amazonaws.com/ip-ranges.json
[11/23/2022] [3:23:51 PM] [IP Ranges] › ℹ  info      Fetching https://www.cloudflare.com/ips-v4
[11/23/2022] [3:23:51 PM] [IP Ranges] › ℹ  info      Fetching https://www.cloudflare.com/ips-v6
[11/23/2022] [3:23:52 PM] [SSL      ] › ℹ  info      Let's Encrypt Renewal Timer initialized
[11/23/2022] [3:23:52 PM] [SSL      ] › ℹ  info      Renewing SSL certs close to expiry...
[11/23/2022] [3:23:52 PM] [IP Ranges] › ℹ  info      IP Ranges Renewal Timer initialized
[11/23/2022] [3:23:52 PM] [Global   ] › ℹ  info      Backend PID 278 listening on port 3000 ...
[11/23/2022] [3:23:56 PM] [Nginx    ] › ℹ  info      Reloading Nginx
[11/23/2022] [3:23:56 PM] [SSL      ] › ℹ  info      Renew Complete
```

Rendez-vous a l'adresse `ip_de_votre_homeassistant:81`  

* **Login :** `admin@example.com`
* **Mot de passe :** `changeme`

Puis une fenêtre vous invite à changer tout ça.

![Première connexion Nginx Proxy Manager](img/premiere_connexion_nginx_proxy_manager.gif "Première connexion Nginx Proxy Manager")

Ensuite ajouter un `HOST` pour lier votre NDD a votre instance

![Ajouter un HOST avec Nginx Proxy Manager](img/ajouter_host_nginx_proxy_manager.gif "Ajouter un HOST avec Nginx Proxy Manager")

Dans l’interface de **Nginx Proxy Manager**:

* Cliquez dans le menu sur `Hosts`,
* Puis `Proxy Hosts`,
* Puis sur `Add Proxy Host`.

Dans la nouvelle fenêtre `New Proxy Host`, renseignez comme suit :

Dans l'onglet `Details` :

* Domaine Names : le nom de domaine que vous avez `<mon-ndd>`, ne pas oubliez de cliquer sur `add <mon-ndd>`
* Scheme : http
* Forward Hostname / IP : l’IP de l’hôte de Home Assistant (**URL Interne** ex 192.168.1.10)
* Forward Port : 8123
* Websockets Support : coché

Dans l'onglet `SSL` :

* SSL Certificate : sélectionner `Request a new SSL certificate`,
* Activer Force SSL, HTTP/2 Support, HSTS Enabled; HSTS Subdomains
* Ajouter une adresse mail (par defaut celle du compte admin)
* Accepter les termes.

Cliquer sur `Save`.

Let’s Encrypt va vous fournir un certificat pour votre Home Assistant.

\### Nettoyage
La redirection du port 80 n’étant plus nécessaire, il est bon de la supprimer.

## Configuration dans Home Assistant

Depuis la 2021.7, il est nécessaire d’ajouter des clés dans le `configuration.yaml` de Home Assistant afin d’autoriser l’utilisation d’un reverse proxy.

Dans le fichier de configuration de HA `configuration.yaml` ajouter :

```
http: #si cette balise n'existe pas, ajoutez la, sinon ajouter seulement la suite (pas de duplication)
  use_x_forwarded_for: true
  trusted_proxies:
    - 172.18.0.1
```

Cette dernière adresse est à personnaliser, pour cela essayer d'ouvrir votre NDD via Nginx Proxy Manager puis rendez-vous dans les journaux de Home Assistant (Paramètres -> Système -> Journaux), une ligne devrait apparaitre sous cette forme. C'est cette adresse qu'il faut mettre.

```
Received X-Forwarded-For header from an untrusted proxy 172.30.33.2
18:01:22 – (ERREUR) HTTP - message survenu pour la première fois à 17:46:12 et apparu 108 fois. 
```

Vérifier votre configuration puis redémarrer.

Essayer de nouveaux de vous connecter avec votre NDD et normalement, vous devriez tomber sur votre Home Assistant.

## Conclusion.

Vous avez maintenant accès à Home Assistant depuis l'extérieur de manière sécurisé (Score SSL A+) et vous pouvez aussi rediriger d'autres services disponibles chez vous.
