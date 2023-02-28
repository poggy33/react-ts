const myDate = (destOffset:number) => {

    const today = new Date();
  
    const localOffset = -(today.getTimezoneOffset() / 60);
  
    const offset = destOffset - localOffset;
  
    const cityDate = new Date(new Date().getTime() + offset * 3600 * 1000)
      .toString()
      .slice(4, 24);

    return {
      cityDate: cityDate
    };
  };
  
  export default myDate;