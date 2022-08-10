const URL_BASE = process.env.VUE_APP_URL_API

const getData = async (MODULE, params = '', data = {}) => {
    try {
        const req = await fetch(`${URL_BASE}/${MODULE}${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                data: JSON.stringify(data)
            }
        })
        return await req.json()
    } catch (error) {
        return {
            error: true,
            messageClient: 'Estamos presentando problemas, por favor intentelo mas tardes.'
        }
    }
}

const sendData = async (MODULE, params = '', formData) => {
    try {
        const req = await fetch(`${URL_BASE}/${MODULE}${params}`, {
            method: 'POST',
            body: formData,
        })
        
        return await req.json()
    } catch (error) {
        return error
    }
}

export {
    getData, sendData
}