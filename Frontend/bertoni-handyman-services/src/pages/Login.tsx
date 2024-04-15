import axios from "axios";
import DOMPurify from "dompurify"; // Import DOMPurify
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/UI/Modal";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import PageLayout from "../layouts/PageLayout";

// Interface for modal properties
interface ModalProps {
	title?: string;
	content?: string;
}

const Login = () => {
	// State for managing form inputs and errors
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate(); // Hook for navigation
	const [modal, setModal] = useState<ModalProps | null>(null); // State for handling modal display and content
	const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
	const recaptchaRef = useRef<ReCAPTCHA>(null); // Ref for reCAPTCHA

	//  Invisible reCAPTCHA site key
	const RECAPTCHA_SITE_KEY = "6LekqZMpAAAAAMKTGiQTGniD0hzZcFGAPByXsboB";

	// Function to validate email format
	const validateEmail = (email: string) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	// Function to toggle password visibility
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	// Function to handle reCAPTCHA verification token and sign-in logic
	const onReCAPTCHAChange = async (token: string | null) => {
		if (!token) return; // If there's no token, do nothing
		let hasError = false;

		// Validate email input
		if (!email.trim()) {
			setEmailError("Email is required.");
			hasError = true;
		} else if (!validateEmail(email)) {
			setEmailError("Please enter a valid email.");
			hasError = true;
		} else {
			setEmailError("");
		}

		// Validate password input
		if (!password.trim()) {
			setPasswordError("Password is required.");
			hasError = true;
		} else {
			setPasswordError("");
		}

		if (hasError) {
			return;
		}
		// Sanitize inputs before sending them to the server
		const sanitizedEmail = DOMPurify.sanitize(email);
		const sanitizedPassword = DOMPurify.sanitize(password);

		try {
			// Attempt to log in the user with sanitized inputs
			const response = await axios.post("http://localhost:3001/login", {
				email: sanitizedEmail,
				password: sanitizedPassword,
				recaptchaToken: token,
			});

			// Login token and storing it in local storage
			const loginToken = response.data.token;
			localStorage.setItem("token", loginToken);

			// Navigate to the admin page upon successful login
			navigate("/admin");
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				console.error("Login Error", error.response.data);
				setModal({
					content: error.response.data.message || "Invalid email or password.",
				});
			} else {
				console.error("Login Error", error);
				setModal({
					content: "An unknown error occurred.",
				});
			}
		}
	};

	// Modified handleSignInWithEmail to trigger reCAPTCHA before login logic
	const handleSignInWithEmail = () => {
		recaptchaRef.current?.execute(); // Trigger the invisible reCAPTCHA
	};

	// Function to handle modal closure
	const errorHandler = () => {
		setModal(null);
	};

	return (
		<PageLayout>
			<div className="min-h-screen">
				<PaddingSectionLayout>
					{/* Modal for displaying error messages */}
					{modal && (
						<Modal
							title={modal.title}
							content={modal.content}
							onConfirm={errorHandler}
						/>
					)}
					<section className="flex flex-col items-center justify-center text-center">
						{/* Sign-in form layout */}
						<h1 className="p-4 text-4xl font-bold">Sign in</h1>
						<p className="max-w-md p-4 text-xl">
							If you have an account with us, you can sign in with your email.
						</p>
						<div className="flex flex-col w-full gap-4 p-5 bg-gray-200 rounded-md md:max-w-lg md:p-12 ">
							<h3 className="font-bold md:text-xl">Email Sign-in</h3>
							{/* Email input field */}
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={`w-full border ${
									emailError ? "border-red-500" : "border-black"
								} rounded-xl bg-[#F2F2F4] p-1 md:p-2`}
							/>
							{emailError && (
								<p className="text-sm text-red-500">{emailError}</p>
							)}
							{/* Password input field and visibility toggle */}
							<div className="relative">
								<input
									type={passwordVisible ? "text" : "password"}
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className={`w-full border ${
										passwordError ? "border-red-500" : "border-black"
									} rounded-xl bg-[#F2F2F4] p-1 md:p-2`}
								/>
								<button
									type="button"
									onClick={togglePasswordVisibility}
									className="absolute inset-y-0 right-0 flex items-center pr-3"
								>
									{passwordVisible ? (
										<FiEyeOff className="w-5 h-5 text-gray-700" />
									) : (
										<FiEye className="w-5 h-5 text-gray-700" />
									)}
								</button>
							</div>
							{passwordError && (
								<p className="text-sm text-red-500">{passwordError}</p>
							)}

							{/* Forgot password link - */}
							<div className="text-right ">
								<Link
									to="/forgot-password"
									className="text-sm text-blue-600 hover:underline"
								>
									Forgot password?
								</Link>
							</div>
							{/* reCAPTCHA here*/}
							<ReCAPTCHA
								ref={recaptchaRef}
								size="invisible"
								sitekey={RECAPTCHA_SITE_KEY}
								onChange={onReCAPTCHAChange} // Handle the reCAPTCHA token
							/>
							{/*  */}
							<div className="items-center ">
								{/* Sign-in button */}
								<button
									type="submit"
									onClick={handleSignInWithEmail}
									className="p-2 px-10 font-bold text-white transition-transform transform bg-orange-500 rounded-md hover:scale-105"
								>
									Sign in
								</button>
							</div>
						</div>
					</section>
				</PaddingSectionLayout>
			</div>
		</PageLayout>
	);
};

export default Login;
