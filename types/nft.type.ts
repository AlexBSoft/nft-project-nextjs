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
    owner: String,
    creator: String
};

export type { NftType, NftTypeDB }