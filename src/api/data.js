import { del, get, post, put } from "./api.js";

export async function getAllOffers() {
    return get("/data/offers?sortBy=_createdOn%20desc");
  }

  export async function createOffer(offer) {
    return post("/data/offers", offer);
  }

  export async function getOfferById(id) {
    return get("/data/offers/" + id);
  }
  export async function getApplicationsByOfferId(offerId){
    return get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`)
}
export async function getMyApplicationsByOfferId(offerId,userId){
    return get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function deleteOffer(id){
    return del("/data/offers/"+id)
}

export async function applyForOffer(offerId){
    return post('/data/applications',{
        offerId
    })
}
export async function updateOffer(id,offer){
    return put('/data/offers/'+id,offer)
}
/*


export async function getBookByUser(userId){
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}








export async function searchBooks(query){
return get('/data/books?where='+ encodeURIComponent(`title LIKE "${query}"`))
}
window.getMyLikeByBookId=getMyLikeByBookId*/