import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (parseInt(formData.age) < 13) {
      alert("You must be 13 or older to sign up.");
      return;
    }
    
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      alert("Account created successfully!");
    } else {
      alert("Error creating account.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96 p-4">
        <CardContent>
          {step === 1 ? (
            <>
              <Input
                type="email"
                placeholder="Email ID"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mb-2"
              />
              <div className="relative mb-4">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button onClick={() => setStep(2)}>Next</Button>
            </>
          ) : (
            <>
              <Input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mb-2"
              />
              <Input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mb-2"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mb-2"
              />
              <Input
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mb-2"
              />
              <Input
                type="number"
                placeholder="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mb-2"
              />
              <Button onClick={handleSubmit}>Create Account</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
