import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

document.getElementById('email-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  const emailInput = document.querySelector('.join-the-mailing-list');
  const submitButton = document.querySelector('.signup');
  const email = emailInput.value;

  try {
    // Insert the email into the email_list table
    const { data, error } = await supabase
      .from('email_list')
      .insert([{ email }]);

    if (error) {
      throw error;
    }

    // If successful, update the button text
    submitButton.textContent = 'Submitted!';
    submitButton.disabled = true; // Optionally, disable the button after submission
    emailInput.value = '';

  } catch (error) {
    console.error('Error:', error);
    alert(`There was an error submitting your email: ${error.message.replace(/ .*/,'')}`);
  }
});
