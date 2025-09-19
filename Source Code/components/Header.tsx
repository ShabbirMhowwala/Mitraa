import { User, LogOut, Shield, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import mitraaLogo from "figma:asset/86c32a97fc21f48bd0dea3175dadadd59af70f52.png";

export function Header({ currentPage, setCurrentPage, user, onLogout }: { 
  currentPage: string; 
  setCurrentPage: (page: string) => void;
  user: any;
  onLogout: () => void;
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigation = ["Home", "Progress", "Self-Check", "Specialized Help", "Community", "Resources & Support"];

  return (
    <header 
      className="sticky top-0 z-40 w-full border-b"
      style={{ background: "var(--gradient-bg)" }}
    >
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage("Home")}>
            <img 
              src={mitraaLogo}
              alt="Mitraa Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 
              className="text-xl font-semibold ml-3"
              style={{ color: "var(--primary-blue)" }}
            >
              Mitraa
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-sm">
          {navigation.map((item) => (
            <button
              key={item}
              onClick={() => setCurrentPage(
                item === "Specialized Help" ? "Specialized-Help" : 
                item === "Resources & Support" ? "Resources" : 
                item
              )}
              className={`transition-colors hover:text-foreground/80 ${
                (currentPage === item || 
                 (item === "Specialized Help" && currentPage === "Specialized-Help") ||
                 (item === "Resources & Support" && (currentPage === "Resources" || currentPage === "Counsellor")))
                  ? "text-foreground font-medium" 
                  : "text-foreground/60"
              }`}
              style={{
                color: (currentPage === item || 
                       (item === "Specialized Help" && currentPage === "Specialized-Help") ||
                       (item === "Resources & Support" && (currentPage === "Resources" || currentPage === "Counsellor")))
                  ? "var(--primary-blue)" 
                  : "var(--text-light)"
              }}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="relative">
          <Button 
            variant="ghost" 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--lavender)' }}>
              {user?.isAnonymous ? (
                <Shield className="w-4 h-4" style={{ color: 'var(--primary-blue)' }} />
              ) : (
                <User className="w-4 h-4" style={{ color: 'var(--primary-blue)' }} />
              )}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium" style={{ color: 'var(--primary-blue)' }}>
                {user?.isAnonymous ? 'Anonymous' : user?.name?.split(' ')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                ID: {user?.id?.slice(-8) || 'Loading...'}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </Button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
              <div className="border-b border-gray-100 pb-3 mb-3">
                <p className="font-medium text-gray-900">
                  {user?.isAnonymous ? 'Anonymous User' : user?.name || 'User'}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'var(--lavender)', color: 'var(--primary-blue)' }}>
                    ID: {user?.id}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {user?.isAnonymous && (
                  <div className="flex items-center space-x-2 text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                    <Shield className="w-3 h-3" />
                    <span>Anonymous mode active</span>
                  </div>
                )}
                
                <Button 
                  variant="ghost" 
                  onClick={onLogout}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}