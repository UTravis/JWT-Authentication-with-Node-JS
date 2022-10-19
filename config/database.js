const mongoose =  require('mongoose');

main().catch(err => console.log(err))

async function main(){
    mongoose.connect(process.env.DATABASE, () => console.log('Connected to DB successfully!') )
}

