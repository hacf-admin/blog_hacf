---
path: ha_audits_securite
title: Audits de sécurité de Home Assistant
type: news
visibleInCMS: true
draft: false
date: 2023-11-01
lastmod: 2023-11-01
description: Home Assistant a subi deux audits de sécurité dans le cadre de nos
  évaluations de sécurité régulières. Vous êtes en sécurité. Aucune faille
  d’authentification n’a été trouvée. Nous avons corrigé des problèmes liés à la
  possibilité pour les attaquants de tromper les utilisateurs pour prendre le
  contrôle de leur instance.
tags:
  - traduction
  - securite
author: default
---
**Résumé :** _Home Assistant a subi deux audits de sécurité dans le cadre de nos évaluations de sécurité régulières. Vous êtes en sécurité. Aucune faille d’authentification n’a été trouvée. Nous avons corrigé des problèmes liés à la possibilité pour les attaquants de tromper les utilisateurs pour prendre le contrôle de leur instance. Tous les correctifs sont inclus dans Home Assistant 2023.9 (sorti le 6 septembre 2023) et les dernières applications Home Assistant pour iOS et Android. Assurez-vous d'avoir fait les mises à jour._





La **sécurité** est très **importante** pour nous chez Home Assistant et Nabu Casa. Être **open source** facilite l’**audit** de notre code par n’**importe qui** - et sur la base des problèmes signalés - les gens le font. Cependant, vous devez également embaucher des personnes pour effectuer un véritable audit de sécurité afin de vous assurer que tout le code important a été couvert.

L’**abonnement** à [Home Assistant Cloud](https://www.nabucasa.com/) fournit un **financement** pour le développement et la **maintenance continus** de Home Assistant, y compris les audits de sécurité externes. Pour garantir que notre sécurité est au top, Nabu Casa a engagé Cure53 pour effectuer un audit de sécurité des parties critiques de Home Assistant. [Cure53](https://cure53.de/) est une entreprise de cybersécurité bien connue qui a trouvé par le passé des vulnérabilités dans les produits [Mastodon](https://arstechnica.com/security/2023/07/mastodon-fixes-critical-tootroot-vulnerability-allowing-node-hijacking/) et [Ring](https://foundation.mozilla.org/en/blog/mozilla-publishes-ring-doorbell-vulnerability-following-amazons-apathy/).

Cure53 a trouvé des problèmes dans Home Assistant, dont 3 ont été marqués comme étant de sévérité “critique”. Les problèmes critiques permettraient à un attaquant de tromper les utilisateurs et de voler les identifiants de connexion. Tous les problèmes signalés ont été résolus dans le cadre de Home Assistant 2023.9, sorti le 6 septembre 2023. Aucun problème de contournement d’authentification n’a été trouvé. 

**Selon le rapport de Cure53 :**

>La qualité du code était impressionnante dans l'ensemble, tandis que l'architecture et les cadres déployés dans tous les domaines d'application pertinents résistaient aux paradigmes de conception en général. La sécurité du frontend en particulier offrait de nombreuses opportunités pour le renforcement, comme en témoignent les risques associés critiques identifiés. Néanmoins, une fois ceux-ci atténués, il sera certainement possible d'atteindre un niveau de sécurité exemplaire.

En août, le [GitHub Security Lab](https://securitylab.github.com/) a également audité Home Assistant. Ils ont trouvé six problèmes non critiques à travers Home Assistant Core et nos applications iOS et Android. Deux des problèmes se recoupent avec Cure53. **Tous les problèmes signalés ont été corrigés et diffusés**.

Nous tenons à remercier les deux équipes pour les audits qu'elles ont réalisés, les problèmes qu'elles ont signalés et la sécurité qu'elles ont assurée à nos utilisateurs 🙏

Tous les problèmes trouvés ont été ajoutés à notre [page de sécurité](https://www.home-assistant.io/security). Cette page a été mise à jour pour inclure une chronologie continue des problèmes signalés, qui l’a divulgué et un lien vers le rapport du problème sur GitHub.





Si vous pensez avoir trouvé un problème de sécurité, consultez notre [page de sécurité](https://www.home-assistant.io/security) sur comment signaler cela à Home Assistant.
