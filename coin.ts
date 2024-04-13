function coine(): string{
	let s: string = "";
	while (s.length != 512){
		let a = Math.floor(Math.random() * 1000);
		let b = Math.floor(Math.random() * 100);
		if (!(a < 32 || b > 128)){
			let c = Math.random();
			s += c > .5 ? String.fromCharCode(a) : String.fromCharCode(b);
		}
	}
	return s;
}

let s = coine();
console.log(s);