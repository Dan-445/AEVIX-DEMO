class AverixChatbot {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.responses = this.getResponses();
        this.conversationContext = null;
    }

    initializeElements() {
        this.toggleBtn = document.querySelector('.chat-toggle-btn');
        this.chatWindow = document.querySelector('.chatbot-window');
        this.minimizeBtn = document.querySelector('.minimize-btn');
        this.messagesContainer = document.querySelector('.chat-messages');
        this.userInput = document.querySelector('#user-input');
        this.sendBtn = document.querySelector('.send-btn');
    }

    initializeEventListeners() {
        // Toggle and minimize buttons
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.minimizeBtn.addEventListener('click', () => this.toggleChat());
        
        // Send button and input field
        this.sendBtn.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });

        // Add event delegation for quick reply buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply')) {
                this.handleQuickReply(e.target.textContent);
            }
        });
    }

    getResponse(message) {
        message = message.toLowerCase();

        // Services
        if (message.includes('services') || message.includes('solutions')) {
            return this.responses.services.general.message;
        }

        // Machine Learning
        if (message.includes('machine') || message.includes('learning') || message.includes('ml')) {
            return this.responses.services.general.message;
        }

        // Pricing
        if (message.includes('pricing') || message.includes('cost') || message.includes('price')) {
            return this.responses.pricing.general.message;
        }

        // Contact
        if (message.includes('contact') || message.includes('talk') || message.includes('connect')) {
            return this.responses.contact.email.message;
        }

        // Default welcome message
        return this.responses.welcome.message;
    }

    handleQuickReply(reply) {
        this.addMessage(reply, 'user');
        
        let response;
        switch(reply.toLowerCase()) {
            // Main menu options
            case 'services':
                response = "Here are our main services:\n\n" +
                    "1. Machine Learning Solutions\n" +
                    "2. Natural Language Processing\n" +
                    "3. Computer Vision\n" +
                    "4. AI Consulting\n\n" +
                    "Which service would you like to learn more about?";
                this.setContext('services');
                break;

            case 'pricing':
                response = "Our pricing packages:\n\n" +
                    "🔵 Starter: $5,000 - $15,000\n" +
                    "• Basic AI Integration\n" +
                    "• Single Use Case\n\n" +
                    "🔷 Professional: $15,000 - $50,000\n" +
                    "• Advanced Solutions\n" +
                    "• Multiple Use Cases\n\n" +
                    "💠 Enterprise: Custom Pricing\n" +
                    "• Full-Scale Implementation\n\n" +
                    "Would you like to discuss your specific requirements?";
                this.setContext('pricing');
                break;

            case 'contact':
                response = "How would you like to reach us?\n\n" +
                    "📧 Email: info@averix.com\n" +
                    "📞 Phone: +1 (555) 123-4567\n" +
                    "💬 Live Chat: Available 24/7\n\n" +
                    "Would you like me to help you connect with our team?";
                this.setContext('contact');
                break;

            case 'about us':
                response = "AVERIX is a leading AI solutions provider:\n\n" +
                    "• 10+ Years Experience\n" +
                    "• 500+ Successful Projects\n" +
                    "• Global Team of Experts\n" +
                    "• Industry-Leading Technology\n\n" +
                    "What would you like to know more about?";
                this.setContext('about');
                break;

            // Service-specific options
            case 'machine learning':
                response = "Our Machine Learning solutions include:\n\n" +
                    "• Predictive Analytics\n" +
                    "• Pattern Recognition\n" +
                    "• Data Mining\n" +
                    "• Custom ML Models\n\n" +
                    "Would you like to see specific examples or discuss your needs?";
                this.setContext('ml');
                break;

            case 'computer vision':
                response = "Our Computer Vision capabilities:\n\n" +
                    "• Object Detection\n" +
                    "• Image Recognition\n" +
                    "• Video Analytics\n" +
                    "• Face Recognition\n\n" +
                    "Which capability interests you?";
                this.setContext('cv');
                break;

            // Action options
            case 'get started':
            case 'schedule demo':
                response = "Great! Let's schedule a demo. Please choose your preferred time:\n\n" +
                    "• Next Business Day\n" +
                    "• This Week\n" +
                    "• Next Week\n\n" +
                    "Or let me connect you with our sales team.";
                break;

            case 'talk to expert':
                response = "I'll connect you with our experts. Please choose your area of interest:\n\n" +
                    "• Technical Consultation\n" +
                    "• Solution Architecture\n" +
                    "• Project Planning\n" +
                    "• Custom Requirements";
                break;

            default:
                response = this.getResponse(reply);
        }

        setTimeout(() => {
            this.addMessage(response, 'bot');
        }, 500);
    }

    async handleUserInput() {
        const message = this.userInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.userInput.value = '';

        this.addTypingIndicator();
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.removeTypingIndicator();

        const response = this.getResponse(message);
        this.addMessage(response, 'bot');
    }

    addMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const content = document.createElement('div');
        content.className = 'message-content';
        const formattedMessage = message.replace(/\n/g, '<br>');
        content.innerHTML = `<p>${formattedMessage}</p>`;

        if (type === 'bot') {
            const quickReplies = document.createElement('div');
            quickReplies.className = 'quick-replies';
            
            // Context-aware quick replies
            switch(this.conversationContext) {
                case 'services':
                    quickReplies.innerHTML = `
                        <button class="quick-reply">Machine Learning</button>
                        <button class="quick-reply">Computer Vision</button>
                        <button class="quick-reply">Get Started</button>
                        <button class="quick-reply">Pricing</button>
                    `;
                    break;
                case 'ml':
                    quickReplies.innerHTML = `
                        <button class="quick-reply">See Examples</button>
                        <button class="quick-reply">Technical Details</button>
                        <button class="quick-reply">Schedule Demo</button>
                        <button class="quick-reply">Talk to Expert</button>
                    `;
                    break;
                case 'pricing':
                    quickReplies.innerHTML = `
                        <button class="quick-reply">Get Quote</button>
                        <button class="quick-reply">Compare Plans</button>
                        <button class="quick-reply">Talk to Sales</button>
                        <button class="quick-reply">See Services</button>
                    `;
                    break;
                case 'contact':
                    quickReplies.innerHTML = `
                        <button class="quick-reply">Schedule Call</button>
                        <button class="quick-reply">Send Email</button>
                        <button class="quick-reply">Live Chat</button>
                        <button class="quick-reply">Request Info</button>
                    `;
                    break;
                default:
                    quickReplies.innerHTML = `
                        <button class="quick-reply">Services</button>
                        <button class="quick-reply">Pricing</button>
                        <button class="quick-reply">Contact</button>
                        <button class="quick-reply">About Us</button>
                    `;
            }
            
            content.appendChild(quickReplies);
        }
        
        messageDiv.appendChild(content);
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    toggleChat() {
        this.chatWindow.classList.toggle('active');
        if (this.chatWindow.classList.contains('active')) {
            this.userInput.focus();
            document.querySelector('.notification-badge').style.display = 'none';
        }
    }

    addTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'message bot-message typing';
        typing.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        this.messagesContainer.appendChild(typing);
    }

    removeTypingIndicator() {
        const typing = document.querySelector('.typing');
        if (typing) typing.remove();
    }

    getResponses() {
        return {
            welcome: {
                message: "👋 Welcome to AVERIX! I'm your AI assistant. I can help you with:\n\n" +
                        "• Our AI & ML Services\n" +
                        "• Detailed Solutions & Use Cases\n" +
                        "• Pricing & Packages\n" +
                        "• Technical Information\n" +
                        "• Connect with Our Team\n\n" +
                        "What would you like to know about?",
                quickReplies: ["Our Services", "Pricing", "Talk to Team", "Technical Details"]
            },
            services: {
                general: {
                    message: "AVERIX offers cutting-edge AI solutions in these areas:\n\n" +
                            "1. Machine Learning Solutions:\n" +
                            "   • Predictive Analytics\n" +
                            "   • Pattern Recognition\n" +
                            "   • Data Mining & Analysis\n" +
                            "   • Custom ML Models\n\n" +
                            "2. Natural Language Processing:\n" +
                            "   • Text Analysis & Generation\n" +
                            "   • Sentiment Analysis\n" +
                            "   • Chatbot Development\n" +
                            "   • Language Translation\n\n" +
                            "3. Computer Vision:\n" +
                            "   • Object Detection & Recognition\n" +
                            "   • Image Processing\n" +
                            "   • Video Analytics\n" +
                            "   • Face Recognition\n\n" +
                            "4. AI Consulting:\n" +
                            "   • Strategy Development\n" +
                            "   • Implementation Planning\n" +
                            "   • Technical Architecture\n" +
                            "   • Team Training\n\n" +
                            "Which area would you like to explore?",
                    quickReplies: ["Machine Learning", "NLP", "Computer Vision", "AI Consulting"]
                }
            },
            pricing: {
                general: {
                    message: "Our pricing is structured into three main tiers:\n\n" +
                            "🔵 Starter Package: $5,000 - $15,000\n" +
                            "• Basic AI Integration\n" +
                            "• Single Use Case Implementation\n" +
                            "• Standard Support (8/5)\n" +
                            "• Basic Training\n\n" +
                            "🔷 Professional Package: $15,000 - $50,000\n" +
                            "• Advanced AI Solutions\n" +
                            "• Multiple Use Cases\n" +
                            "• Priority Support (16/7)\n" +
                            "• Comprehensive Training\n" +
                            "• Custom Development\n\n" +
                            "💠 Enterprise Package: Custom Pricing\n" +
                            "• Full-Scale Implementation\n" +
                            "• Unlimited Use Cases\n" +
                            "• Premium Support (24/7)\n" +
                            "• Full Team Training\n" +
                            "• Dedicated Account Manager\n\n" +
                            "Would you like to discuss your specific requirements?",
                    quickReplies: ["Get Custom Quote", "Schedule Consultation", "Talk to Sales", "Compare Features"]
                }
            },
            contact: {
                email: {
                    message: "I'll help you connect with the right team. Please choose your area of interest:\n\n" +
                            "• Sales Team: sales@averix.com\n" +
                            "• Technical Team: tech@averix.com\n" +
                            "• Support Team: support@averix.com\n" +
                            "• General Inquiries: info@averix.com\n\n" +
                            "Would you like me to draft an email for you?",
                    quickReplies: ["Draft Sales Email", "Draft Technical Email", "Draft Support Email", "Other Inquiry"]
                },
                emailDraft: {
                    sales: {
                        subject: "Inquiry about AVERIX AI Solutions",
                        body: "Hello AVERIX Team,\n\nI'm interested in learning more about your AI solutions. I would like to discuss:\n\n- Specific requirements\n- Pricing options\n- Implementation timeline\n\nPlease contact me to schedule a discussion.\n\nBest regards,"
                    },
                    technical: {
                        subject: "Technical Discussion Request",
                        body: "Hello AVERIX Technical Team,\n\nI would like to discuss the technical aspects of your AI solutions. Specifically interested in:\n\n- Technical architecture\n- Integration requirements\n- Implementation process\n\nLooking forward to your response.\n\nBest regards,"
                    }
                }
            },
            implementation: {
                process: {
                    message: "Our implementation process follows these key steps:\n\n" +
                            "1. Discovery Phase (1-2 weeks):\n" +
                            "   • Requirements gathering\n" +
                            "   • Technical assessment\n" +
                            "   • Solution design\n\n" +
                            "2. Development Phase (4-12 weeks):\n" +
                            "   • Solution development\n" +
                            "   • Integration setup\n" +
                            "   • Testing & validation\n\n" +
                            "3. Deployment Phase (2-4 weeks):\n" +
                            "   • System deployment\n" +
                            "   • User training\n" +
                            "   • Documentation\n\n" +
                            "4. Support Phase (Ongoing):\n" +
                            "   • Monitoring & optimization\n" +
                            "   • Regular updates\n" +
                            "   • Technical support\n\n" +
                            "Would you like to discuss your project timeline?",
                    quickReplies: ["Get Timeline", "Technical Details", "Start Project", "Talk to Expert"]
                }
            }
        };
    }

    setContext(context) {
        this.conversationContext = context;
    }

    // Add method to handle email drafting
    handleEmailDraft(type) {
        const mailtoLink = document.createElement('a');
        const emailData = this.responses.contact.emailDraft[type];
        
        mailtoLink.href = `mailto:${type}@averix.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
        mailtoLink.click();
        
        return "I've helped draft an email for you. Your default email client should open with a pre-filled message. Feel free to modify it before sending.\n\nIs there anything else I can help you with?";
    }
}

// Initialize chatbot when document loads
document.addEventListener('DOMContentLoaded', () => {
    new AverixChatbot();
}); 