export default function clean(data) {
    if (Array.isArray(data)) {
        return data.map(el => el.replace(/\(\?[^\)]+\)/g,''))
    }
    if (typeof data === 'string') {
        return data.replace(/\(\?.*\)/g,'')
    }
    
}