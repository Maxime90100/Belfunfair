import bcrypt from "bcrypt"
import {pool} from "./../db.js"

export default class UsersService {

    async getUsers(){
        return new Promise((resolve,reject)=>{
            pool.query('select * from users order by id ASC;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getEmplacements(type){
        return new Promise((resolve,reject)=>{
            pool.query('select emplacements'+type+'.id as id_emplacement, '+type+'.id, '+type+'.name as name, cast('+type+'Inscrit.dateDebut as varchar), cast('+type+'Inscrit.dateFin as varchar), '+type+'Inscrit.cancel from emplacements'+type+' left join '+type+'Inscrit on emplacements'+type+'.id = '+type+'Inscrit.id_emplacement left join '+type+' on '+type+'.id = '+type+'Inscrit.id_'+type.substring(0,type.length - 1)+' order by emplacements'+type+'.id ASC;', (error,result)=>{
               if(error){
                   console.error(error)
                   reject(error)
               }
               resolve(result.rows)
           });
        });
    }

    async getTypesManege(){
        return new Promise((resolve, reject)=>{
            pool.query('select * from types_manege;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getTypesStand(){
        return new Promise((resolve, reject)=>{
            pool.query('select * from types_stand;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getTypesArtist(){
        return new Promise((resolve, reject)=>{
            pool.query('select * from types_artiste;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }

    async getInProgressManifestation(){
        return new Promise((resolve, reject) => {
            pool.query('select id, cast(dateDebut as TEXT), cast(dateFin as TEXT), inProgress from manifestations where inProgress=true;', (error, result) => {
                if (error) {
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }

    // MANEGES

    async getManeges(){
        return new Promise((resolve,reject)=>{
            pool.query('select m.id, m.id_user, m.name, t.libelle as type, m.taille_min, m.description, m.images, m.status from maneges m join types_manege t on m.type = t.id order by m.id ASC;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getManegesByIdUser(id_user){
        return new Promise((resolve,reject)=>{
            pool.query('select m.id, m.id_user, m.name, t.libelle as type, m.taille_min, m.description, m.images, m.status, cast(mi.datedebut as TEXT), cast(mi.datefin as TEXT), mi.cancel from maneges m join types_manege t on m.type = t.id left join manegesInscrit mi on m.id = mi.id_manege where m.id_user=$1 order by m.id ASC;', [id_user], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getManegeById(id){
        return new Promise((resolve,reject)=>{
            pool.query('select m.id, m.id_user, m.name, m.type, t.libelle as typeLibelle, m.taille_min, m.description, m.images, m.status from maneges m join types_manege t on m.type = t.id where m.id=$1;', [id], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows[0])
            });
        });
    }
    async getManegesStartWith(start){
        return new Promise((resolve,reject)=>{
            pool.query('select * from maneges where name like $1;', [start+"%"], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }

    // STANDS

    async getStands(){
        return new Promise((resolve,reject)=>{
            pool.query('select s.id, s.id_user, s.name, t.libelle as type, s.description, s.images, s.status from stands s join types_stand t on s.type = t.id order by s.id ASC;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getStandsByIdUser(id_user){
        return new Promise((resolve,reject)=>{
            pool.query('select s.id, s.id_user, s.name, t.libelle as type, s.description, s.images, s.status, cast(si.datedebut as TEXT), cast(si.datefin as TEXT), si.cancel from stands s join types_stand t on s.type = t.id left join standsInscrit si on s.id = si.id_stand where id_user=$1 order by id ASC;', [id_user], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getStandById(id){
        return new Promise((resolve,reject)=>{
            pool.query('select s.id, s.id_user, s.name, s.type, t.libelle as typeLibelle, s.description, s.images, s.status from stands s join types_stand t on s.type = t.id where s.id=$1;', [id], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows[0])
            });
        });
    }
    async getStandsStartWith(start){
        return new Promise((resolve,reject)=>{
            pool.query('select * from stands  where name like $1;', [start+"%"], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }

    // SCENE

    async getArtists(){
        return new Promise((resolve,reject)=>{
            pool.query('select a.id, a.id_user, a.name, t.libelle as type, a.description, a.images, a.groupe, a.status from artistes a join types_artiste t on a.type = t.id order by a.id ASC;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getArtistsInscrits(){
        return new Promise((resolve,reject)=>{
            pool.query('select a.id, a.id_manifestation, a.id_artiste, CAST(a.date as TEXT), a.starthour, a.endhour from artistesinscrit a;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getArtistsByIdUser(id_user){
        return new Promise((resolve,reject)=>{
            pool.query('select a.id, a.id_user, a.name, t.libelle as type, a.description, a.images, a.groupe, a.status, cast(ai.date as TEXT), ai.starthour, ai.endhour, ai.cancel from artistes a join types_artiste t on a.type = t.id left join artistesinscrit ai on a.id = ai.id_artiste where id_user=$1 order by id ASC;', [id_user], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getArtistById(id){
        return new Promise((resolve,reject)=>{
            pool.query('select a.id, a.id_user, a.name, a.type, t.libelle as typeLibelle, a.description, a.images, a.groupe, a.status, cast(ai.date as TEXT), ai.starthour, ai.endhour, ai.cancel from artistes a join types_artiste t on a.type = t.id left join artistesinscrit ai on a.id = ai.id_artiste where a.id=$1;', [id], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows[0])
            });
        });
    }
    async getArtistsStartWith(start){
        return new Promise((resolve,reject)=>{
            pool.query('select * from artistes  where name like $1;', [start+"%"], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }











    // STAFF

    async getStaffById(id){
        return new Promise((resolve,reject)=>{
            pool.query('select * from staff where id=$1;', [id], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows[0])
            });
        });
    }

    async getStaffByIdUser(id_user){
        return new Promise((resolve,reject)=>{
            pool.query('select * from staff where id_user=$1 order by id ASC;', [id_user], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }

    async authenticate(data){
        let users = await this.getUsers()
        const user = users.find((u) =>
            u.firstname.toLowerCase() === data.firstname.toLowerCase() &&
            u.surname.toLowerCase() === data.surname.toLowerCase())
        return new Promise((resolve, reject)=>{
            if (user) {
                bcrypt.compare(data.password,user.password,(err,result)=>{
                    if(result){
                        resolve({success:1,message:`Bienvenue ${user.firstname} ${user.surname}`,data:user});
                    }
                    reject({success:0,message:"Mot de passe incorrect !",data:[]});
                });
            } else {
                reject({success:0,message:'Pr??nom ou Nom incorrect !',data:[]});
            }
        })
    }
}