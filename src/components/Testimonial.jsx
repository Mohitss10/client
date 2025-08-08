import React from 'react';
import { assets } from '../assets/assets';

const Testimonial = () => {
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200",
            name: 'Riya Sharma',
            title: 'Fashion Influencer',
            content: 'Using this tool has transformed the way I create content for my social media. It’s fast, intuitive, and saves me hours every week. I highly recommend it to any influencer who needs professional-looking visuals quickly.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200",
            name: 'Aarav Singh',
            title: 'Startup Founder',
            content: 'As a founder with limited time, I need tools that work efficiently. This background remover delivers excellent results and integrates seamlessly into my product workflow. It has genuinely improved the visual quality of our app screenshots and investor decks.',
            rating: 5,
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Lucy_Liu_Rosemead-13_%28cropped%29.jpg/960px-Lucy_Liu_Rosemead-13_%28cropped%29.jpg",
            name: 'ELa row',
            title: 'Digital Artist',
            content: 'Being a digital artist, I rely heavily on clean assets and quick editing. This tool helps me isolate subjects instantly and focus more on creative work rather than tedious edits. It’s become a must-have in my creative toolkit.',
            rating: 4,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr1okdz5BaSL3XrtTM34l07qe77EGiO47fYw&s",
            name: 'Kunal Verma',
            title: 'YouTuber',
            content: 'Thumbnail creation used to be a nightmare until I found this. I now create high-quality thumbnails in minutes, which has improved my click-through rate noticeably. It’s a brilliant solution for content creators.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'Ishita Desai',
            title: 'UI/UX Designer',
            content: 'This tool fits perfectly into my design workflow. Whether for prototypes or client presentations, I can now create neat visuals effortlessly. The output quality is consistently high and professional.',
            rating: 4,
        },
        {
            image: "https://t3.ftcdn.net/jpg/04/38/83/06/360_F_438830653_xouYSy0iYiLnrZZj6iTAjIyPKdHKqO7e.jpg",
            name: 'Rohit Shetty',
            title: 'eCommerce Owner',
            content: 'Managing hundreds of product images used to be time-consuming. With this tool, background removal takes seconds and the results are impressive. It has reduced my dependency on outsourced editing.',
            rating: 5,
        },
        {
            image: "https://t3.ftcdn.net/jpg/04/66/11/16/360_F_466111661_OjJSc9Wrf9J9NXKCsCmQhCafEjnktg88.jpg",
            name: 'Tanya Reddy',
            title: 'Content Strategist',
            content: 'I’ve tried several tools, but this one consistently delivers sharp, clean cutouts even in complex images. It has improved my ad creatives and made my team’s job a lot easier. Definitely worth it.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=200",
            name: 'Aditya Malhotra',
            title: 'Marketing Executive',
            content: 'For someone managing multiple campaigns, I need tools that save time without sacrificing quality. This service does exactly that. It has enhanced our promotional visuals across all channels.',
            rating: 5,
        },
        {
            image: "https://www.shutterstock.com/image-photo/head-shot-portrait-smart-confident-260nw-1721092123.jpg",
            name: 'Neha Joshi',
            title: 'Social Media Manager',
            content: 'I use this daily for ad creatives, posts, and stories. The consistency and speed of output is unmatched. It’s helped us maintain a strong brand presence online with minimal effort.',
            rating: 5,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2TJgv0kh8JgQiGDFa71MNu-iPyIfLYdoNbM1rM3tRTd1K2FSyY7y7DZ36wwFrhTKjQ98&usqp=CAU",
            name: 'Siddharth Menon',
            title: 'Tech Reviewer',
            content: 'I use this tool to clean up images for thumbnails and blog content. It works even when the background is messy or has similar colors. It’s smart and surprisingly accurate.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200",
            name: 'Kriti Jain',
            title: 'Freelance Editor',
            content: 'As someone working with tight deadlines, this tool is a blessing. I no longer need to spend time in Photoshop for simple edits. The one-click process is just too good to pass up.',
            rating: 5,
        },
        {
            image: "https://images.pexels.com/photos/1215695/pexels-photo-1215695.jpeg?cs=srgb&dl=pexels--rahulshah--1215695.jpg&fm=jpg",
            name: 'Priyansh Gupta',
            title: 'Graphic Designer',
            content: 'What I appreciate most is the clean UI and minimal learning curve. You get studio-quality cutouts instantly, which is super valuable in design work. Great tool for solo designers and teams.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww",
            name: 'Anjali Mishra',
            title: 'Student & Blogger',
            content: 'I use this tool for both my school projects and my personal blog. It’s very helpful when creating attractive visuals without complex software. Even non-techies can use it easily.',
            rating: 5,
        },
        {
            image: "https://www.shutterstock.com/image-photo/headshot-portrait-smiling-young-indian-260nw-2029044050.jpg",
            name: 'Simran Kaur',
            title: 'Photographer',
            content: 'Background editing is a major part of my job. This tool helps me achieve studio-like results with very little effort. It handles complex hair edges beautifully too!',
            rating: 5,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYqeNsFHrGqJ18934RIm-8Q-iT43GT06q78Q&s",
            name: 'Mohit Yadav',
            title: 'Entrepreneur',
            content: 'I’ve tried a lot of tools, but none match the precision and simplicity of this one. It’s ideal for both business and personal use, and my presentations now look so much better.',
            rating: 4,
        }
    ]



    const infiniteTestimonials = [...dummyTestimonialData, ...dummyTestimonialData];

    return (
        <div className='px-4 sm:px-20 xl:px-32 py-24 relative overflow-hidden'>
            <div className='text-center'>
                <h2 className='text-slate-400 text-[32px] sm:text-[42px] font-bold'>What Our Users Say</h2>
                <p className='text-gray-300 max-w-lg mx-auto'>
                    Discover how creators and professionals are achieving more with our tools.
                </p>
            </div>


            {/* Infinite scrolling container */}
            <div className='mt-16 overflow-hidden'>
                <div className='scroll-track'>
                    <div className='scroll-content'>
                        {infiniteTestimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className='w-80 shrink-0 p-6 sm:p-8 m-2  rounded-lg shadow-md border border-white/20 hover:-translate-y-1 transition duration-300'
                            >
                                <div className='flex items-center gap-1'>
                                    {Array(5)
                                        .fill(0)
                                        .map((_, idx) => (
                                            <img
                                                key={idx}
                                                src={idx < testimonial.rating ? assets.star_icon : assets.star_dull_icon}
                                                className='w-4 h-4'
                                                alt='star'
                                            />
                                        ))}
                                </div>
                                <p className='text-white text-sm my-4 line-clamp-5'>
                                    "{testimonial.content}"
                                </p>
                                <hr className='mb-4 border-gray-300' />
                                <div className='flex items-center gap-4'>
                                    <img
                                        src={testimonial.image}
                                        className='w-12 h-12 object-cover rounded-full'
                                        alt={testimonial.name}
                                    />
                                    <div className='text-sm text-white'>
                                        <h3 className='font-medium'>{testimonial.name}</h3>
                                        <p className='text-xs text-white'>{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom styling */}
            <style jsx>{`
        .scroll-track {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .scroll-content {
          display: flex;
          width: max-content;
          animation: scroll-right 40s linear infinite;
        }

        .scroll-track:hover .scroll-content {
          animation-play-state: paused;
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </div>
    );
};

export default Testimonial;
