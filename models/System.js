import mongoose from "mongoose";

// Não é necessário importar o User diretamente aqui,
// o Mongoose usará automaticamente a referência definida no campo `ref: 'User'`.

const NoiseSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
})
const Noise = mongoose.model("Noise", NoiseSchema)


const SongsSchema = new mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    duration: Number,
    genre: String,
    url_streaming: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                // Validação simples de URL usando expressão regular
                // Validação de URL que permite opcionalmente o protocolo http/https
                return /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/.test(v);
            },
            message: props => `${props.value} não é uma URL válida!`
        }
    }
},{timestamps: true})
const Song = mongoose.model("Song", SongsSchema)


const PlaylistSchema = new mongoose.Schema({
    title: String,
    description: String,
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itens: [SongsSchema],
},{ timestamps: true })
const Playlist = mongoose.model("Playlist", PlaylistSchema)



export default { Noise, Playlist, Song }
