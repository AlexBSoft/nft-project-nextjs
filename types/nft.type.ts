type NftType = {
    id: Number,
    file: string,
    name: string,
    description: string,
    price: Number,
    color: String,
    created_at: Date,
    owner: String,
    creator: String
};

// Поля страницы NFT в базе данных. Все приведены к String, чтобы реакт не ругался
type NftTypeDB = {
    id: string,
    file: string,
    name: string,
    description: string,
    price: string,
    color: String,
    created_at: String,
    blockchain: String,
    owner: String,
    creator: String
};

type Transfer = {
    id: string,
    created_at: String,
    nft_id: string,
    user_from: string,
    user_to: string,
}

export type { NftType, NftTypeDB, Transfer }