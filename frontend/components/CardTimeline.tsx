export default function CardTimeline(props: any) {
    const timelines = props?.timelines;
    
    return (
       <div>
            {timelines.map((t: any, index: any) => (
                <div className='flex flex-row' key={'timeline_'+index}>
                    <div className='w-min w-3/12 md:w-2/12 fs-yellow'>
                        {t.date}
                    </div>
                    <div className='w-1/12 relative'>
                        <div className="border border-r-dotted border-blue absolute h-full z-10" style={{ left: '48%'}}></div>
                        <div className='w-0.5 h-0.5 rounded-full bg-yellow border border-blue relative p-1.5 mx-auto mt-1.5 z-20'></div>
                    </div>
                    <div className='w-8/12 md:w-9/12 bg-light-blue p-2 mb-4'>
                        {t.information.map((ti: any, i: any) => (
                            <div className='flex flex-row gap-4 relative' key={'timeline_information_'+i}>
                                <span className="cursor-pointer absolute top-0 right-0 pr-2">x</span>
                                <div className='w-3/12 fs-yellow'>
                                    {ti.time_from} - {ti.time_to}
                                </div>
                                <div className='w-9/12'>
                                    <span>{ti.detail}</span>
                                    <p className='text-sky-500'>
                                        {ti.location_type} { ti.location_name ? ' - '+ti.location_name : ti.location_name }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
       </div>
    );
}