function fibsRec(n)
{
    console.log("This was printed recursively");
    if(n<=0) return [];

    if(n===1) return [0];

    if(n===2) return [0,1];

        const prev = fibsRec(n - 1)
       prev.push(prev[prev.length - 1] + prev[prev.length - 2]);

    return prev;
}

module.exports = fibsRec;