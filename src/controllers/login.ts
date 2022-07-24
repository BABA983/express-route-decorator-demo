import { NextFunction, Request, Response } from "express";
import { Controller, Use, ValidateRequestBody } from "./decorators";
import { Get, Post, Put } from "./decorators/routes";

function logger(req: Request, res: Response, next: NextFunction) {
	console.log(`${req.method} ${req.path}`);
	next();
}

@Controller('')
export class HomeController {
	@Get("/")
	public index(req: Request, res: Response) {
		res.send(`<h1>Hello World</h1>
		<a href="/xxx/login">Login</a>
		`);
	}
}



@Controller('/xxx')
export class LoginController {
	@Get('/login')
	@Use(logger)
	login(req: Request, res: Response) {
		res.send(`
		<Form method="post">
			<div>
				<label>Email</label>
				<input name="email" type="email" />
			</div>
			<div>
				<label>Password</label>
				<input name="password" type="password" />
			</div>
			<button type="submit">Login</button>
		</Form>`);
	}
	@Get('/invalidLogin')
	@Use(logger)
	invalidLogin(req: Request, res: Response) {
		res.send(`
		<Form method="post">
			<div>
				<label>Email</label>
				<input name="email1" type="email" />
			</div>
			<div>
				<label>Password</label>
				<input name="password" type="password" />
			</div>
			<button type="submit">Login</button>
		</Form>`);
	}

	@Post('/login')
	@Use(logger)
	@ValidateRequestBody('email', 'password')
	postLogin(req: Request, res: Response) {
		const { email, password } = req.body;
		if (email && password) {
			req.session = { loginSuccess: true };
			res.send(`
				<h1>Welcome ${email}</h1>
				<a href="/xxx/login">Logout</a>
			`);
		} else {
			res.send('Invalid email or password');
		}
	}
	@Post('/invalidLogin')
	@Use(logger)
	@ValidateRequestBody('email', 'password')
	invalidPostLogin(req: Request, res: Response) {
		const { email, password } = req.body;
		if (email && password) {
			req.session = { loginSuccess: true };
			res.send(`
				<h1>Welcome ${email}</h1>
				<a href="/xxx/login">Logout</a>
			`);
		} else {
			res.send('Invalid email or password');
		}
	}

	@Get('/getData/:id')
	// @Validate('res', ['arr'])
	getData(req: Request, res: Response) {
		if (req.params.id === '1') {
			// res.set('Content-Type', 'application/json');
			// res.json({ arr: [1, 2, 3] });
			res.send({ arr: [1, 2, 3] });
		} else {
			res.send('invalid id')
		}
	}

	@Put('/update')
	@Use(logger)
	update(req: Request, res: Response) {
		res.send('update');
	}

}