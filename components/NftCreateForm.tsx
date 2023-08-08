'use client';

/*
Форма для создания NFT


*/

import Link from 'next/link'
import { v4 as uuidv4 } from "uuid";
import { useRouter } from 'next/navigation'

// Supabase - в него мы грузим картинку и данные
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

// Поля формы - параметры NFT
import {NftType} from "@/types/nft.type"

export default function NftCreateForm() {

    const supabase = createClientComponentClient()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<NftType>();

    const router = useRouter()

    // Обработчик формы
    const onSubmit: SubmitHandler<NftType> = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append("file", data.file[0]);

        const filename = uuidv4();

        // Загрузка файла сначала
        const { data: sdata, error: serror } = await supabase.storage
        .from("images")
        .upload(filename, data.file[0], {
            cacheControl: "3600",
            upsert: false,
        });

        if(serror)
            return toast.error('Ошибка загрузки файла')

        const filepath = sdata?.path;
        console.log("Filepath", filepath)

        // Затем мы добавляем запись в базу данных (nзапись это все данные о нашем NFT)
        const { data: ddata, error: derror } = await supabase
        .from('nfts')
        .insert({ file: filepath, name: data.name, description: data.description, price: data.price, color: data.color || "primary"})
        .select()

        if(derror)
            return toast.error('Ошибка создания NFT')

        // После - открываем страницу созданного NFT
        router.push(`/nft/${ddata[0].id}`)
    } 

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Загрузите изображение</span>
                    <span className="label-text-alt">Изображение NFT</span>
                </label>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" accept="image/png, image/jpeg" {...register("file", { required: true })} />
                {errors.file && <label className="label">
                    <span className="label-text-alt">Это поле обязательно</span>
                </label>}
                
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Название NFT</span>
                </label>
                <input type="text" placeholder="Название NFT" className="input input-bordered w-full max-w-xs" {...register("name", { required: true })} />
                {errors.name && <label className="label">
                    <span className="label-text-alt">Это поле обязательно</span>
                </label>}
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Описание NFT</span>
                </label>
                <textarea className="textarea textarea-bordered h-24" placeholder="Описание NFT" {...register("description", { required: true })}></textarea>
                {errors.description && <label className="label">
                    <span className="label-text-alt">Это поле обязательно</span>
                </label>}
            </div>


            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Стоимость</span>
                </label>
                <div className="input-group ">
                    <input type="number" step="0.01" placeholder="0.01" className="input input-bordered w-full" {...register("price", { required: true, valueAsNumber: true,})}/>
                    <span>CBAK</span>
                </div>
                {errors.price && <label className="label">
                    <span className="label-text-alt">Это поле обязательно</span>
                </label>}
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Цвет (редкость)</span>
                </label>
                <div className="join">
                    <input type="radio" className="radio radio-primary mr-2" value="primary" {...register("color")}/>
                    <input type="radio" className="radio radio-secondary mr-2" value="secondary" {...register("color")}/>
                    <input type="radio" className="radio radio-accent mr-2" value="accent" {...register("color")}/>
                    <input type="radio" className="radio radio-warning mr-2" value="warning" {...register("color")}/>
                    <input type="radio" className="radio radio-info mr-2" value="info" {...register("color")}/>
                    <input type="radio" className="radio radio-error" value="error" {...register("color")}/>
                </div>
            </div>

            {errors.root && <span>This field is required</span>}

            <button type="submit"  className="btn mt-4 btn-primary" >Создать этот NFT</button>
            <Toaster />
        </form>
      
    )
}