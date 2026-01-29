import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/inter'
import './style.scss'

const STORED_PROPS = [
    'key', 'code',
    'altKey', 'ctrlKey', 'shiftKey', 'metaKey',
    'location', 'repeat', 'isComposing'
] as const
type StoredProp = typeof STORED_PROPS[number]

function associate<T>(callback: (prop: StoredProp) => T){
    return Object.fromEntries(
        STORED_PROPS.map(p=>[p, callback(p)])
    ) as Record<StoredProp, T>
}

const $title: HTMLDivElement = document.querySelector('#title')!
const $values = associate<HTMLDivElement>(p=>document.querySelector(`#${p}-value`)!)

type KeyEventRecord = { [K in StoredProp]: KeyboardEvent[K] }

function display(record: KeyEventRecord){
    $title.textContent = '// key'
    for(const prop of STORED_PROPS){
        const value = record[prop]
        $values[prop].textContent = typeof value === 'string' ? `'${value}'` : value.toString()
    }   
}

addEventListener('keydown', e=>{
    if(config.preventDefault) e.preventDefault()
    display(associate(p=>e[p]) as KeyEventRecord)
})

interface Config {
    preventDefault: boolean
}

const $config: Record<keyof Config, HTMLDivElement> = {
    preventDefault: document.querySelector('#preventDefault-config')!
}

let config: Config = {
    preventDefault: true
}

function loadConfig(){

    try{
        const newConfig = localStorage.getItem('config')
        if(newConfig) config = JSON.parse(newConfig)
    }catch(e){
        console.warn(e)
    }

    saveConfig()

}
loadConfig()

function saveConfig(){
    
    localStorage.setItem('config', JSON.stringify(config))

    $config.preventDefault.textContent = config.preventDefault.toString()

}

$config.preventDefault.addEventListener('click', ()=>{
    config.preventDefault = !config.preventDefault
    saveConfig()
})