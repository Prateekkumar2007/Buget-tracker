function calculate() {
  const total = parseFloat(document.getElementById('totalBudget').value || 0);
  const food = parseFloat(document.getElementById('food').value || 0);
  const travel = parseFloat(document.getElementById('travel').value || 0);
  const recharge = parseFloat(document.getElementById('recharge').value || 0);
  const others = parseFloat(document.getElementById('others').value || 0);

  const spent = food + travel + recharge + others;
  const remaining = total - spent;

  let message = `
    <strong>Total Budget:</strong> ₹${total}<br>
    <strong>Spent:</strong> ₹${spent}<br>
    <strong>Remaining:</strong> ₹${remaining}<br>
  `;

  // Category wise warning
  if (food > 300) {
    message += "⚠️ <b>Food expense is high. Try to reduce eating out!</b><br>";
    speak("You spent too much on food. Control it.");
  }
  if (recharge > 200) {
    message += "⚠️ <b>Recharge cost is high. Re-evaluate your plans.</b><br>";
    speak("Your recharge spending is too much.");
  }

  // Overall judgment
  if (remaining < 0) {
    message += "❌ <b>You're overspending! Reduce your expenses.</b>";
    speak("You are spending more than your budget. Please manage wisely.");
  } else if (remaining <= total * 0.3) {
    message += "⚠️ <b>Only little budget left. Be careful!</b>";
    speak("Only little budget left. Spend carefully.");
  } else {
    message += "✅ <b>Good job! You're managing your savings well.</b>";
    speak("You are managing your savings well. Keep it up!");
  }

  document.getElementById('result').innerHTML = message;
}

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}