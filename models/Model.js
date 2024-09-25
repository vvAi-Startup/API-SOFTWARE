import mongoose from "mongoose";

// Não é necessário importar o User diretamente aqui,
// o Mongoose usará automaticamente a referência definida no campo `ref: 'User'`.

// Sub-schema para os metadados
const metadataSchema = new mongoose.Schema({
    tamanho: String, // Para o tamanho do dataset (ex: "1GB")
    formatos: [String], // Array de formatos de arquivo (ex: ["jpg", "png"])
    versao: String, // Para a versão do modelo (ex: "1.0")
    framework: String // Para o framework usado no modelo (ex: "TensorFlow")
});

// Schema principal para dados de IA
const AiDataSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    tipo: { type: String, enum: ['dataset', 'modelo'], required: true }, // Tipo do dado (dataset ou modelo)
    nome: { type: String, required: true }, // Nome do dataset ou modelo
    descricao: { type: String, required: true }, // Descrição do dataset ou modelo
    url: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/.test(v);
            },
            message: props => `${props.value} não é uma URL válida!`
        }
    },
    data_criacao: { type: Date, default: Date.now, required: true }, 
    metadados: [metadataSchema] 
}, { timestamps: true }); 
const AIData = mongoose.model("AIData", AiDataSchema);
export default AIData;
