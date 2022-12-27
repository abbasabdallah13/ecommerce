import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
    if(!stripePromise){
        stripePromise = loadStripe('pk_test_51MJAR2K4ZYDz9Q9ug36vqoJJbqc0OTX5U9Ao61IwmZ73U2kYseeRffLv9DgAAlv4ey6nKgX2FJk0FDqk90TKsCVj007oqXfmpi')
    }

    return stripePromise;
}

export default getStripe;