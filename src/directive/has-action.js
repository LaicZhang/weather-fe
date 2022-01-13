import storage from '../util/storage'
const directive = {
  beforeMount(el,{value}){
    const actionList = storage.getItem('actionList')
    if(!actionList.includes(value)){
      el.style.display = 'none';
      setTimeout(()=>{
        el.parentNode.removeChild(el)
      },0)
    }
  }
};

export default directive;
