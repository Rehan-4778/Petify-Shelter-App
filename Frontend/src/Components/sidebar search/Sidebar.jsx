import React from 'react'
import './sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown , faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {

    const handleAccordion = (e) => {
        let menu = document.querySelectorAll('.menu');
        
        let accordion = e.target;
        if(e.target.tagName !== 'DIV'){
            
            accordion = e.target.parentNode.parentNode;

        }
        
        accordion.classList.toggle('active');
        accordion.nextElementSibling.classList.toggle('active');
        accordion.children[1].children[0].classList.toggle('active');
        accordion.children[1].children[1].classList.toggle('active');
        menu.classList.remove('active');

    }

    const handleMenu =  (e) => {

        if(e.type === 'blur'){
            setTimeout(() => {
                e.target.nextElementSibling.classList.toggle('active');
            }, 500);
        }
        else{
            e.target.nextElementSibling.classList.toggle('active');
        }
    }

    const handleItemClick = (e) => {

        setTimeout(() => {
            e.target.parentNode.classList.remove('active');
        }, 500);

        e.target.parentNode.previousElementSibling.value = e.target.id;
        e.stopPropagation();
    }


  return (
    <div className="sidebar_container">
        <div className="sidebar_header">
            <h5>Show Results By:</h5>
        </div>
        
        {/* Search Box */}
        <div className="search_accordion">
            <div className="accordion_header active" onClick={(e)=> handleAccordion(e)}>
                <span>
                    <h5>Search by keyword</h5>
                </span>
                <span>
                    <FontAwesomeIcon className='icon active' icon={faChevronDown}/>
                    <FontAwesomeIcon className='icon' icon={faChevronUp}/>
                </span>

            </div>  
            <div className="accordion_body active">
                <div className="search_input">
                    <input type="text" placeholder="e.g. Pet in black color"/>
                    <button>
                        <FontAwesomeIcon className='icon' icon={faSearch}/>
                    </button>
                </div>    
            </div>  

        </div>

        {/* Breeds */}
        <div className="breed_accordion">
            <div className="accordion_header active" onClick={(e)=> handleAccordion(e)}>
                <span>
                    <h5>Breed</h5>
                </span>
                <span>
                    <FontAwesomeIcon className='icon active' icon={faChevronDown}/>
                    <FontAwesomeIcon className='icon ' icon={faChevronUp}/>
                </span>

            </div>  
            <div className="accordion_body active">
                <div className="items">

                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="breed1" id="breed1" />
                            <label htmlFor="breed1">German Shepherd</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>
                    
                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="breed1" id="breed1" />
                            <label htmlFor="breed1">Poodle</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>

                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="breed1" id="breed1" />
                            <label htmlFor="breed1">Alaskan Malamute</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>

                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="breed1" id="breed1" />
                            <label htmlFor="breed1">Siberian Husky</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>
                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="breed1" id="breed1" />
                            <label htmlFor="breed1">Airedale Terrier</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>
                </div>    

            </div>  

        </div>

        {/* Color */}
        <div className="color_accordion">
            <div className="accordion_header active" onClick={(e)=> handleAccordion(e)}>
                <span>
                    <h5>Color</h5>
                </span>
                <span>
                    <FontAwesomeIcon className='icon active' icon={faChevronDown}/>
                    <FontAwesomeIcon className='icon ' icon={faChevronUp}/>
                </span>

            </div>  
            <div className="accordion_body active">
                <div className="items">
                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="color1" id="color1" />
                            <label htmlFor="color1">White</label>
                        </div>
                        <div className='quantity'>12</div>
                    </div>

                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="color2" id="color2" />
                            <label htmlFor="color2">Black</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>
                    
                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="color3" id="color3" />
                            <label htmlFor="color3">Nardo Grey</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>

                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="color4" id="color4" />
                            <label htmlFor="color4">Silver</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>

                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="color5" id="color5" />
                            <label htmlFor="color5">Brown</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>

                </div>    

            </div>  

        </div>

        {/* Price */}
        <div className="price_accordion">
            <div className="accordion_header active" onClick={(e)=> handleAccordion(e)}>
                <span>
                    <h5>Price</h5>
                </span>
                <span>
                    <FontAwesomeIcon className='icon active' icon={faChevronDown}/>
                    <FontAwesomeIcon className='icon ' icon={faChevronUp}/>
                </span>

            </div>  
            <div className="accordion_body active">
                <div className="price_search">
                    <div className="min_price">
                        <input type="tel" name="minPrice" value="" id="minPrice" placeholder='From' onClick={(e)=>handleMenu(e)} onBlur={(e)=>handleMenu(e)}/>
                        <div className="menu" >
                            <div className="item" id="5000" onClick={(e)=>handleItemClick(e)}>5,000</div>
                            <div className="item" id="10000" onClick={(e)=>handleItemClick(e)}>10,000</div>
                            <div className="item" id="20000" onClick={(e)=>handleItemClick(e)}>20,000</div>
                            <div className="item" id="40000" onClick={(e)=>handleItemClick(e)}>40,000</div>
                            <div className="item" id="60000" onClick={(e)=>handleItemClick(e)}>60,000</div>
                            <div className="item" id="80000" onClick={(e)=>handleItemClick(e)}>80,000</div>
                            <div className="item" id="100000" onClick={(e)=>handleItemClick(e)}>100,000</div>
                            <div className="item" id="200000" onClick={(e)=>handleItemClick(e)}>200,000</div>
                            <div className="item" id="400000" onClick={(e)=>handleItemClick(e)}>400,000</div>
                            <div className="item" id="500000" onClick={(e)=>handleItemClick(e)}>500,000</div>
                        </div>
                    </div>

                    <div className="max_price">
                        <input type="text" name="maxPrice" id="maxPrice" placeholder='To' onClick={(e)=>handleMenu(e)} onBlur={(e)=>handleMenu(e)}/>
                        <div className="menu">
                            <div className="item" id="5000" onClick={(e)=>handleItemClick(e)}>5,000</div>
                            <div className="item" id="10000" onClick={(e)=>handleItemClick(e)}>10,000</div>
                            <div className="item" id="20000" onClick={(e)=>handleItemClick(e)}>20,000</div>
                            <div className="item" id="40000" onClick={(e)=>handleItemClick(e)}>40,000</div>
                            <div className="item" id="60000" onClick={(e)=>handleItemClick(e)}>60,000</div>
                            <div className="item" id="80000" onClick={(e)=>handleItemClick(e)}>80,000</div>
                            <div className="item" id="100000" onClick={(e)=>handleItemClick(e)}>100,000</div>
                            <div className="item" id="200000" onClick={(e)=>handleItemClick(e)}>200,000</div>
                            <div className="item" id="400000" onClick={(e)=>handleItemClick(e)}>400,000</div>
                            <div className="item" id="500000" onClick={(e)=>handleItemClick(e)}>500,000</div>
                        </div>
                    </div>    
                    <button>
                        <FontAwesomeIcon className='icon' icon={faSearch}/>
                    </button>

                </div>    

            </div>  

        </div>

        {/* Age */}
        <div className="age_accordion">
            <div className="accordion_header active" onClick={(e)=> handleAccordion(e)}>
                <span>
                    <h5>Age</h5>
                </span>
                <span>
                    <FontAwesomeIcon className='icon active' icon={faChevronDown}/>
                    <FontAwesomeIcon className='icon ' icon={faChevronUp}/>
                </span>

            </div>  
            <div className="accordion_body active">
                <div className="items">
                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="age1" id="age1" />
                            <label htmlFor="age1">30 Day</label>
                        </div>
                        <div className='quantity'>12</div>
                    </div>

                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="age2" id="age2" />
                            <label htmlFor="age2">2 Months</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>
                    
                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="age3" id="age3" />
                            <label htmlFor="age3">3 Months</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>

                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="age4" id="age4" />
                            <label htmlFor="age4">4 Months</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>

                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="age5" id="age5" />
                            <label htmlFor="age5">5 Months</label>
                        </div>
                        <div className='quantity'>120</div>
                    </div>

                </div>    

            </div>  
        </div>

        {/* Picture */}
        <div className="picture_accordion">
            <div className="accordion_header active" onClick={(e)=> handleAccordion(e)}>
                <span>
                    <h5>Picture Availability</h5>
                </span>
                <span>
                    <FontAwesomeIcon className='icon active' icon={faChevronDown}/>
                    <FontAwesomeIcon className='icon ' icon={faChevronUp}/>
                </span>

            </div>  
            <div className="accordion_body active">
                <div className="items">
                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="pic" id="pic" />
                            <label htmlFor="pic">With Pictures</label>
                        </div>
                        <div className='quantity'>12</div>
                    </div>

                </div>    

            </div>  
        </div>

        {/* Video */}
        <div className="video_accordion">
            <div className="accordion_header active" onClick={(e)=> handleAccordion(e)}>
                <span>
                    <h5>Video Availability</h5>
                </span>
                <span>
                    <FontAwesomeIcon className='icon active' icon={faChevronDown}/>
                    <FontAwesomeIcon className='icon ' icon={faChevronUp}/>
                </span>

            </div>  
            <div className="accordion_body active">
                <div className="items">
                    <div className="item">
                        <div className='name'>
                            <input type="checkbox" name="video" id="video" />
                            <label htmlFor="video">With Video</label>
                        </div>
                        <div className='quantity'>12</div>
                    </div>

                </div>    

            </div>  
        </div>


    </div>



  );
}
