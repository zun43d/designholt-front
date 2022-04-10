import {getBuyerWithId} from '@/lib/sanityAdmin';

export default async function handler(req,res) {
    if(req.method==='POST'){
        const { productId, userId } = req.query;

        const buyerData = await getBuyerWithId(userId);
        if(buyerData.length === 0){
            return res.status(404).json({message: 'User does not exist'});
        }
        
        const {bought} = buyerData;

        if(bought.length > 0){
            bought.map((item) => {
                const {expires, product: {_ref}} = item;
                console.log(expires, _ref);
                console.log(productId, userId);

                return _ref === productId ? console.log('exists') : res.status(404).json({message: 'No product found!'})
            })
        } else {
            return res.status(404).json({message: 'No bought items found!'})
        }

    } else {
        res.status(405).json({message: 'Method not allowed!'})
    }
}