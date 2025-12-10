import { Layout } from "@/components/layout/Layout";
import { UseCaseCard } from "@/components/UseCaseCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Data from the user's provided list
const allUseCases = [
  { title: "Sales calls", category: "Sales", description: "Outbound sales conversations that introduce product features and book demos." },
  { title: "Lead qualification", category: "Sales", description: "Automated questions to validate lead intent and route to sales." },
  { title: "Customer support", category: "Support", description: "First-line troubleshooting and ticket creation via voice flows." },
  { title: "Emergency helpdesk", category: "Support", description: "Critical incident call flows for escalation and response coordination." },
  { title: "Appointment scheduling", category: "Operations", description: "Book and confirm appointments automatically through voice or SMS." },
  { title: "COD verification", category: "Operations", description: "Confirm Cash-on-Delivery orders with automated verification calls." },
  { title: "Medicine reminders", category: "Healthcare", description: "Timely reminders for patients to take medication as prescribed." },
  { title: "Clinic reminders", category: "Healthcare", description: "Reminder calls for upcoming clinic visits and follow-ups." },
  { title: "Class notifications", category: "Education", description: "Send class schedule changes and cancellations by automated calls." },
  { title: "Payment reminders", category: "Finance", description: "Automated calls reminding customers about due payments and invoices." },
  { title: "Delivery confirmation", category: "Operations", description: "Confirm deliveries and capture recipient acknowledgements automatically." },
  { title: "Restaurant booking", category: "Operations", description: "Voice booking flows for reservations and confirmations." },
  { title: "Travel agent calls", category: "Operations", description: "Automated itineraries, booking confirmations and reminders for travelers." },
  { title: "School announcements", category: "Education", description: "Broadcast important school notices and emergency alerts to parents and staff." },
  { title: "Fitness trainer reminders", category: "Healthcare", description: "Automated session reminders and motivational follow-ups for trainees." },
  { title: "Real estate follow-ups", category: "Sales", description: "Follow up with prospects after property viewings or open houses." },
  { title: "Loan reminder calls", category: "Finance", description: "Notify borrowers of upcoming installments and due dates." },
  { title: "HR screening calls", category: "Operations", description: "Initial candidate screening and scheduling via automated voice flows." },
  { title: "Event RSVP calls", category: "Marketing", description: "Collect RSVP confirmations and dietary preferences by voice." },
  { title: "Automated surveys", category: "Marketing", description: "Run voice or IVR surveys and collect structured responses." },
  { title: "Ticket booking confirmation", category: "Operations", description: "Confirm ticket purchases and deliver e-ticket instructions." },
  { title: "Subscription renewal reminders", category: "Sales", description: "Notices for upcoming renewals and upsell opportunities." },
  { title: "Utility bill reminders", category: "Finance", description: "Automated reminders for utility payments like electricity and water." },
  { title: "Insurance follow-ups", category: "Finance", description: "Policy renewal, claim status and documentation follow-ups via calls." },
  { title: "Warranty checks", category: "Operations", description: "Confirm warranty registrations and remind on warranty expirations." },
  { title: "Feedback collection calls", category: "Marketing", description: "Collect NPS and detailed feedback from customers after a transaction." },
  { title: "Product return scheduling", category: "Operations", description: "Schedule collection slots and confirm return logistics." },
  { title: "Subscription activation calls", category: "Sales", description: "Activate subscriptions and walk users through onboarding steps." },
  { title: "Outage notifications", category: "Support", description: "Broadcast outages and ETA to affected users automatically." },
  { title: "Maintenance alerts", category: "Support", description: "Notify stakeholders about scheduled maintenance and expected disruptions." },
  { title: "Inventory restock alerts", category: "Operations", description: "Alert procurement and sales teams when items reach restock thresholds." },
  { title: "Donor outreach calls", category: "Marketing", description: "Engage donors for campaigns, updates and fundraising reminders." },
  { title: "Political outreach calls", category: "Marketing", description: "Constituent outreach for information sharing and event invites." },
  { title: "NGO volunteer coordination", category: "Operations", description: "Call flows for volunteer scheduling, logistic coordination and reminders." },
  { title: "Product launch calls", category: "Marketing", description: "Engage early adopters and media contacts for launch announcements." },
  { title: "Survey recruitment calls", category: "Marketing", description: "Recruit and schedule participants for research and surveys." },
  { title: "Debt collection reminders", category: "Finance", description: "Gentle reminders and repayment scheduling with compliance options." },
  { title: "Appointment confirmations", category: "Operations", description: "Automated confirmations and rescheduling options for bookings." },
  { title: "Candidate interview reminders", category: "Operations", description: "Reminder calls with instructions and prep materials for candidates." },
  { title: "Customer NPS calls", category: "Marketing", description: "Collect Net Promoter Score and short feedback via a voice call." },
  { title: "Order cancellation recovery", category: "Sales", description: "Automated retention flow to recover cancelled orders with offers." },
  { title: "Cross-sell calls", category: "Sales", description: "Personalized cross-sell dialogs based on purchase history." },
  { title: "Upsell appointment setting", category: "Sales", description: "Automated appointment setting for higher-tier offers and demos." },
  { title: "Class attendance reminders", category: "Education", description: "Automated calls to encourage attendance and reduce no-shows." },
  { title: "Electricity usage alerts", category: "Support", description: "Notify customers about high usage and provide energy saving tips." },
  { title: "Water usage alerts", category: "Support", description: "Warn customers about unusual water consumption or leaks." },
  { title: "Smart-meter thresholds", category: "Support", description: "Call triggers for smart meter thresholds and automated billing notices." },
  { title: "Fleet dispatch alerts", category: "Operations", description: "Notify drivers with route updates, ETAs and dispatch instructions." },
  { title: "Security alarm follow-ups", category: "Support", description: "Automated follow-up checks after alarm triggers to confirm status." },
  { title: "On-call shift notifications", category: "Operations", description: "Alert on-call staff of assignments, shift swaps and urgent incidents." },
];

const categories = ["All", "Sales", "Support", "Operations", "Healthcare", "Education", "Finance", "Marketing"];

export default function UseCases() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredCases = allUseCases.filter(c => {
    const matchesCat = filter === "All" || c.category === filter;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <Layout title="Virtual Calling Use Cases" subtitle="50+ ready-to-deploy call flows and templates for every industry.">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search templates..." 
            className="pl-9 bg-black/20 border-white/10 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
           {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat)}
              className={`rounded-full ${filter !== cat ? 'border-white/10 bg-transparent text-muted-foreground hover:text-white hover:bg-white/5' : ''}`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCases.map((c, i) => (
          <UseCaseCard 
            key={i} 
            title={c.title}
            description={c.description}
            actionText="Open"
            onAction={() => {}}
          />
        ))}
      </div>
    </Layout>
  );
}
