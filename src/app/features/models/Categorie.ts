export class Categorie{
    id:	number
    libelle: string
}

export class NiveauDeSorti{
    id:	number
    libelle: string
}
export class Formation {
    id:	number
    libelle: string
    description: string
    duree: string
    dateDeSessionAdmission: string
    programmeURL: string
    lieuDispense: string
    rythme: string
    admission: string
    rentree: string
    competences: Array<any>
    categorie: Categorie
    niveauDeSorti: NiveauDeSorti
    image: string
}
export class Contact{
    id:	number
    nom: string
    message: string
    email: string
    formation: Formation
}

export class Candidature{
    id:	number
    nom: string
    intitule: string
    email: string
    telephone: string
    lettre: string
    cvURL: string
}
export class Alternance{
    id:	number
    intitule: string
    niveauQualification: string
    positionAlternant: string
    lieuDeTravail: string
    remuneration: string
    coordonneeCandidatures: string
    description: string
    competences: string
}
export class DemandeEquivalence{
    id:	number
    nom: string
    email: string
    paysOrigine: string
    paysEqivalence: string
    lettre: string
    telephone: string
    prenom: string
}
