import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

const Account = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Account</h1>
        <p className="text-muted-foreground">Manage your profile and KYC details</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-24 w-24 rounded-full bg-gradient-primary flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
              KYC Pending
            </Badge>
          </div>
        </Card>

        <Card className="p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: "John Doe" },
              { label: "Mobile", value: "+91 9876543210" },
              { label: "Email", value: "john.doe@example.com" },
              { label: "Father's Name", value: "Robert Doe" },
              { label: "Mother's Name", value: "Jane Doe" },
              { label: "Nominee", value: "Sarah Doe" },
            ].map((field, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-sm text-muted-foreground">{field.label}</p>
                <p className="font-medium">{field.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Document Details</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "Aadhaar Number", value: "XXXX XXXX 1234" },
            { label: "PAN Number", value: "ABCDE1234F" },
          ].map((field, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-sm text-muted-foreground">{field.label}</p>
              <p className="font-medium">{field.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "Account Holder", value: "John Doe" },
            { label: "Account Number", value: "XXXX XXXX 5678" },
            { label: "IFSC Code", value: "ABCD0123456" },
            { label: "UPI ID", value: "john@upi" },
          ].map((field, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-sm text-muted-foreground">{field.label}</p>
              <p className="font-medium">{field.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Account;