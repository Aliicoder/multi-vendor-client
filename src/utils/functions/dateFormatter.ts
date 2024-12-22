export default (timestamp:string):string =>{
  const options:Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'short', 
    year: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  return new Date(timestamp)
  .toLocaleString('en-US', options)
  .toLowerCase()
  .replace(/,/g, '') 
  .replace(' ', ', ') 
  .replace(/24/, "'24");
}