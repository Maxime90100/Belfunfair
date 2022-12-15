import UsersService from "../services/users.service.js";
import {pool} from "../db.js";

export default class PrestatairesService {

    // MANEGES

    async showManeges(id_user,id_manege){
        let service = new UsersService()
        if(id_manege !== undefined){
            let manege = await service.getManegeById(id_manege)
            let types = await service.getTypesManege()
            return ({success:1,data:{manege:manege,types:types}})
        }
        return service.getManegesByIdUser(id_user)
    }
    async addManege(id_user,name,description,type,taille_min){
        return new Promise((resolve,reject)=>{
            pool.query('insert into maneges(id_user,name,type,taille_min,description,status) values ($1,$2,$3,$4,$5,$6);', [id_user,name,type,taille_min,description,"not_attributed"], (error,result)=>{
                if(error){
                    console.error(error)
                    resolve(error)
                }
                resolve({success:1,data:'Votre manège "'+name+'" à bien été ajouté !'})
            });
        });
    }
    async editManege(id_manege,name,description,type,taille_min){
        return new Promise((resolve,reject)=>{
            pool.query('update maneges set name=$1, description=$2, type=$3, taille_min=$4 where id=$5;', [name,description,type,taille_min,id_manege], (error,result)=>{
                if(error){
                    console.error(error)
                    resolve({success:0,date:error})
                }
                resolve({success:1,data:'Votre manège "'+name+'" à bien été modifié !'})
            });
        });
    }
    async deleteManege(id_manege){
        let service = new UsersService()
        return new Promise(async (resolve,reject)=>{
            service.getManegeById(id_manege).then(manege=>{
                if(manege.status === "not_attributed"){
                    pool.query('delete from maneges where id=$1;', [id_manege], (error,result)=>{
                        if(error){
                            console.error(error)
                            resolve({success:0,date:error})
                        }
                        resolve({success:1,data:'Votre manège "'+manege.name+'" à bien été supprimé !'})
                    });
                }else{
                    resolve({success:0,data:'Votre manège "'+manege.name+'" ne peut pas être supprimé car il est déjà inscrit ou en cours d\'inscription ! Faites une demande d\'annulation dans le menu \"inscription\"'})
                }
            }).catch(error=>{
                console.error(error)
                resolve({success:0,date:error})
            });
        });
    }
    async signupManege(id_manege,id_emplacament,datedebut,datefin){
        return new Promise(async (resolve,reject)=>{
           pool.query('insert into manegesinscrit(id_manege,id_emplacement,datedebut,datefin) values ($1,$2,$3,$4);', [id_manege,id_emplacament,datedebut,datefin], (error,result)=>{
               if(error){
                   console.error(error)
                   resolve({success:0,date:error})
               }
               pool.query('update maneges set status=$1 where id=$2;', ['wait_attribution',id_manege])
               resolve({success:1,data:'Votre demande d\'inscription à bien été prise en compte !'})
           });
        });
    }

    // STANDS

    async showStands(id_user,id_stand){
        let service = new UsersService()
        if(id_stand !== undefined){
            let stand = await service.getStandById(id_stand)
            let types = await service.getTypesStand()
            return ({success:1,data:{stand:stand,types:types}})
        }
        return service.getStandsByIdUser(id_user)
    }
    async addStand(id_user,name,description,type){
        return new Promise((resolve,reject)=>{
            pool.query('insert into stands(id_user,name,description,type,status) values ($1,$2,$3,$4,$5);', [id_user,name,description,type,"not_attributed"], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve({success:1,data:'Votre stand "'+name+'" à bien été ajouté !'})
            });
        });
    }
    async editStand(id_stand,name,description,type){
        return new Promise((resolve,reject)=>{
            pool.query('update stands set name=$1, description=$2, type=$3 where id=$4;', [name,description,type,id_stand], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve({success:1,data:'Votre stand "'+name+'" à bien été modifié !'})
            });
        });
    }
    async deleteStand(id_stand){
        let service = new UsersService()
        return new Promise(async (resolve,reject)=>{
            service.getStandById(id_stand).then(stand=>{
                if(stand.status === "not_attributed") {
                    pool.query('delete from stands where id=$1;', [id_stand], (error, result) => {
                        if (error) {
                            console.error(error)
                            reject(error)
                        }
                        resolve({success:1,data:'Votre stand "'+stand.name+'" à bien été supprimé !'})
                    });
                }else{
                    resolve({success:0,data:'Votre stand "'+stand.name+'" ne peut pas être supprimé car il est déjà inscrit ou en cours d\'inscription ! Faites une demande d\'annulation dans le menu \"inscription\"'})
                }
            }).catch(error=>{
                console.error(error)
                reject(error)
            });
        });
    }
    async signupStand(id_stand,id_emplacament,datedebut,datefin){
        return new Promise(async (resolve,reject)=>{
            pool.query('insert into standsinscrit(id_stand,id_emplacement,datedebut,datefin) values ($1,$2,$3,$4);', [id_stand,id_emplacament,datedebut,datefin], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                pool.query('update stands set status=$1 where id=$2;', ['wait_attribution',id_stand])
                resolve({success:1,data:'Votre demande d\'inscription à bien été prise en compte !'})
            });
        });
    }

    // SCENE

    async showArtists(id_user,id_artist){
        let service = new UsersService()
        if(id_artist !== undefined){
            let artist = await service.getArtistById(id_artist)
            let types = await service.getTypesArtist()
            return ({success:1,data:{artist:artist,types:types}})
        }
        return service.getArtistsByIdUser(id_user)
    }
    async addArtist(id_user,name,description,type,groupe){
        return new Promise((resolve,reject)=>{
            pool.query('insert into artistes(id_user,name,description,type,status,groupe) values ($1,$2,$3,$4,$5,$6);', [id_user,name,description,type,"not_attributed",groupe.toString()], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve({success:1,data:'Votre groupe "'+name+'" à bien été ajouté !'})
            });
        });
    }
    async editArtist(id_artiste,name,description,type,groupe){
        return new Promise((resolve,reject)=>{
            pool.query('update artistes set name=$1, description=$2, type=$3, groupe=$4 where id=$5;', [name,description,type,groupe,id_artiste], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve({success:1,data:'Votre groupe "'+name+'" à bien été modifié !'})
            });
        });
    }
    async deleteArtist(id_artist){
        let service = new UsersService()
        return new Promise(async (resolve,reject)=>{
            service.getArtistById(id_artist).then(artist=>{
                if(artist.status === "not_attributed") {
                    pool.query('delete from artistes where id=$1;', [id_artist], (error, result) => {
                        if (error) {
                            console.error(error)
                            reject(error)
                        }
                        resolve({success:1,data:'Votre groupe "'+artist.name+'" à bien été supprimé !'})
                    });
                }else{
                    resolve({success:0,data:'Votre groupe "'+artist.name+'" ne peut pas être supprimé car il est déjà inscrit ou en cours d\'inscription ! Faites une demande d\'annulation dans le menu \"inscription\"'})
                }
            }).catch(error=>{
                console.error(error)
                reject(error)
            });
        });
    }
}