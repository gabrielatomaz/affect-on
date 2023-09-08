export default interface RatingEntity {
    id: number,
    nota: number,
    id_local_hospedagem: number,
    cpf: string,
    comentario?: string,
}