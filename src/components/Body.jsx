import {useEffect,useState} from 'react'
import {copy,linkIcon,loader,tick} from '../assets'
import { useLazyGetSummaryQuery } from '../services/article';

const Body = () => {

  const[article,setArticle] = useState({
    url:'',
    summary:'',
  });
  const[allArticles,setallArticles] = useState([])

  const [copied, setCopied] = useState("")

  const [getSummary, {error,isFetching}] = useLazyGetSummaryQuery();

  useEffect(()=>{
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

    if(articlesFromLocalStorage){
      setallArticles(articlesFromLocalStorage)
    }
  },[])

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const {data} = await getSummary({articleUrl:article.url});
    if(data?.summary){
      const newArticle = {...article,summary:data.summary};
      const updatedAllarticles = [newArticle,...allArticles];
      setArticle(newArticle);
      setallArticles(updatedAllarticles);
      console.log(newArticle);

      localStorage.setItem('articles',JSON.stringify(updatedAllarticles));
    }
  }

  const handleCopy = (copyUrl)=>{
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(()=>setCopied(false),3000);
  }


  return (
    <section className='w-full mt-16 max-w-xl'>
        <div className='flex flex-col w-full gap-2'>
            <form className='relative flex justify center items-center' onSubmit={handleSubmit}>
                <img
                  src={linkIcon}
                  alt='link_icon'
                  className='absolute left-0 my-2 ml-3 w-5'
                />
                <input type='url' placeholder='Enter a URL' value={article.url} required onChange={(e)=>setArticle({
                  ...article, url:e.target.value
                })} className='url_input peer'/>
                <button type="submit" className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
                <p>↵</p>
            </button>
            </form>
            {/* Browse URL History */}
        </div>
        <div className='flex flex-col gap-5 max-h-80 overflow-y-auto mt-2'>
              {allArticles.map((item,index)=>(
                <div
                onClick={()=>setArticle(item)}
                key={`link-${index}`}
                className='link_card'
                >
                  <div className='copy_btn' onClick={()=>handleCopy(item.url)}>
                    <img
                      src={copied === item.url ? tick : copy}
                      alt = 'copy_icon'
                      className='w-[40%] h-[40%] object-contain'
                    />
                  </div>
                  <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{item.url}</p>
                </div>
              ))}
            </div>

            {/* Display Result */}
            <div className='my-10 max-w-full flex justify-center items-center'>
              {isFetching ? (
                <img src={loader} alt="loader" className='w-20 h-20 object-contain'/>
              ) : error ?(
                  <p className='font-inter font-bold text-black text-center'>
                    Well,that wasn't supposed to happen....
                    <br/>
                    <span className='font-satoshi font-normal text-gray-700'>
                      {error?.data?.error}
                    </span>
                  </p>
              ):(
                article.summary && (
                  <div className='flex flex-col gap-3'>
                    <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                      Article <span className='blue_gradient'> Summary</span>
                    </h2>
                    <div className='summary_box'>
                      <p>{article.summary}</p>
                    </div>
                  </div>
                )
              )}
            </div>
    </section>
  )
}

export default Body